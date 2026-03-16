import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { useState } from "react";

type TContactFormData = {
  name: string;
  phoneNumber: string;
  certificated: boolean;
};

const schema: RJSFSchema = {
  title: "Todo",
  type: "object",
  required: ["name", "phoneNumber"],
  properties: {
    name: { type: "string", title: "Name Surname" },
    phoneNumber: {
      type: "string",
      title: "Phone number",
      pattern: "^[0-9]{6,15}$",
    },
    certificated: { type: "boolean", title: "Certificated?" },
  },
};

const uiSchema: UiSchema = {
  name: {
    "ui:autofocus": true,
  },
  phoneNumber: {
    "ui:options": {
      inputType: "tel",
    },
    "ui:placeholder": "Enter digits only",
    "ui:help": "Use 6 to 15 digits",
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState<TContactFormData>({
    name: "",
    phoneNumber: "",
    certificated: false,
  });

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      formData={formData}
      onChange={(e) => setFormData(e.formData as TContactFormData)}
      onSubmit={({ formData }) => {
        alert(JSON.stringify(formData));
      }}
      // onError={() => console.log("errors")}
      // onBlur={(target) => log(`blur ${target.split("_")[1]}`)}
      // onFocus={(target) => log(`focus ${target.split("_")[1]} `)}
    />
  );
}
