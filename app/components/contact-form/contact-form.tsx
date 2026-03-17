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

type TContactFormData = {
  name: string;
  customNumber: string;
  certificated: boolean;
};

const schema: RJSFSchema = {
  type: "object",
  required: ["name", "customNumber"],
  properties: {
    name: { type: "string", title: "Name Surname", pattern: "^[a-zA-Z\\s]+$" },
    customNumber: {
      type: "string",
      title: "Phone number",
      pattern: "^[0-9]{6,15}$",
    },
    certificated: { type: "boolean", title: "Certificated?" },
  },
  if: { properties: { certificated: { const: true } } },
  then: {
    properties: {
      customNumber: {
        title: "Employee ID",
        pattern: undefined,
        minLength: 3,
        maxLength: 6,
      },
    },
  },
};

function PhoneWidget(props: WidgetProps) {
  const { id, value, onChange, placeholder } = props;
  return (
    <input
      id={id}
      type="tel"
      value={(value as string) || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 8 }}
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
  errors.map((error) => {
    if (error.name === "pattern" && error.property === ".customNumber") {
      return {
        ...error,
        message: "Phone number must contain only digits and be 6 to 15 characters long",
      };
    }
    if (error.name === "pattern" && error.property === ".name") {
      return { ...error, message: "Name must contain only letters" };
    }
    if (error.name === "minLength" && error.property === ".customNumber") {
      return { ...error, message: "Employee ID must be at least 3 characters" };
    }
    if (error.name === "maxLength" && error.property === ".customNumber") {
      return { ...error, message: "Employee ID must be at most 6 characters" };
    }
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
        "ui:widget": formData.certificated ? undefined : "phoneWidget",
        "ui:placeholder": formData.certificated ? "Enter employee ID" : "Enter digits only",
        "ui:help": formData.certificated ? "Between 3 and 6 characters" : "Use 6 to 15 digits",
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
      widgets={{ phoneWidget: PhoneWidget }}
      templates={{ FieldTemplate: CustomTemplate, ErrorListTemplate: () => null }}
      transformErrors={transformErrors}
      onChange={(e) => setFormData(e.formData as TContactFormData)}
      onSubmit={({ formData }) => alert(JSON.stringify(formData, null, 2))}
    />
  );
}
