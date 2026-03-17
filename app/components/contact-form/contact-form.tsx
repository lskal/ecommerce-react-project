import { useMemo, useState } from "react";
import type {
  RJSFSchema,
  UiSchema,
  WidgetProps,
  FieldTemplateProps,
  RJSFValidationError,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";

// TODO: move to app/types/product.ts one day
type TContactFormData = {
  name: string;
  customNumber: string;
  certificated: boolean;
};

const schema: RJSFSchema = {
  type: "object",
  required: ["name"],
  oneOf: [
    {
      title: "Regular Contact",
      properties: {
        name: { type: "string", title: "Name Surname", pattern: "^[a-zA-Z\\s]+$" },
        customNumber: {
          type: "string",
          title: "Phone number",
          pattern: "^[0-9]{6,15}$",
        },
        certificated: { type: "boolean", title: "Certificated?", const: false },
      },
      required: ["name", "customNumber"],
    },
    {
      title: "Certified Employee",
      properties: {
        name: { type: "string", title: "Name Surname", pattern: "^[a-zA-Z\\s]+$" },
        customNumber: {
          type: "string",
          title: "Employee ID",
          minLength: 3,
          maxLength: 6,
        },
        certificated: { type: "boolean", title: "Certificated?", const: true },
      },
      required: ["name", "customNumber"],
    },
  ],
};

function PhoneWidget(props: WidgetProps) {
  const { id, value, onChange, placeholder, rawErrors } = props;
  const hasError = rawErrors && rawErrors.length > 0;

  return (
    <input
      id={id}
      type="tel"
      value={(value as string) || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      style={{
        width: "100%",
        padding: "8px 12px",
        border: `1px solid ${hasError ? "crimson" : "#ccc"}`,
        borderRadius: 8,
      }}
    />
  );
}

function EmployeeIdWidget(props: WidgetProps) {
  const { id, value, onChange, placeholder, rawErrors } = props;
  const hasError = rawErrors && rawErrors.length > 0;

  return (
    <input
      id={id}
      type="text"
      value={(value as string) || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "8px 12px",
        border: `1px solid ${hasError ? "crimson" : "#ccc"}`,
        borderRadius: 8,
      }}
    />
  );
}

function CustomTemplate(props: FieldTemplateProps) {
  const { id, label, required, children, errors, help } = props;
  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label
          className="labelField"
          htmlFor={id}
          style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
        >
          {label} {required ? "*" : ""}
        </label>
      )}
      {children}
      <div style={{ marginTop: 8, color: "crimson" }}>{errors}</div>
      <div style={{ marginTop: 4, color: "#666" }}>{help}</div>
    </div>
  );
}

const transformErrors = (errors: RJSFValidationError[]) =>
  errors
    .filter((error) => error.name !== "oneOf")
    .filter((error) => !(error.name === "const" && error.property === ".certificated"))
    .map((error) => {
      if (error.name === "pattern" && error.property === ".customNumber")
        return {
          ...error,
          message: "Phone number must contain only digits and be 6 to 15 characters long",
        };
      if (error.name === "pattern" && error.property === ".name")
        return { ...error, message: "Name must contain only letters" };
      if (error.name === "minLength" && error.property === ".customNumber")
        return { ...error, message: "Employee ID must be at least 3 characters" };
      if (error.name === "maxLength" && error.property === ".customNumber")
        return { ...error, message: "Employee ID must be at most 6 characters" };
      return error;
    });

export default function ContactForm() {
  const [formData, setFormData] = useState<TContactFormData>({
    name: "",
    customNumber: "",
    certificated: false,
  });

  const dynamicUiSchema = useMemo<UiSchema>(
    () => ({
      name: {
        "ui:autofocus": true,
        "ui:placeholder": formData.certificated ? "Certified person name" : "Enter full name",
      },

      customNumber: {
        "ui:widget": formData.certificated ? "employeeIdWidget" : "phoneWidget",
        "ui:placeholder": formData.certificated ? "Enter employee ID" : "Enter digits only",
        "ui:help": formData.certificated ? "Between 3 and 6 characters" : "Use 6 to 15 digits",
      },

      certificated: {
        "ui:options": { label: true },
      },
    }),
    [formData.certificated],
  );

  return (
    <Form
      schema={schema}
      uiSchema={dynamicUiSchema}
      validator={validator}
      formData={formData}
      widgets={{ phoneWidget: PhoneWidget, employeeIdWidget: EmployeeIdWidget }}
      templates={{ FieldTemplate: CustomTemplate }}
      transformErrors={transformErrors}
      onChange={(e) => setFormData(e.formData as TContactFormData)}
      onSubmit={({ formData }) => alert(JSON.stringify(formData, null, 2))}
      onError={(e) => alert(JSON.stringify(e, null, 2))}
      noHtml5Validate
      liveValidate
    />
  );
}
