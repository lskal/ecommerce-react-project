import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { useEffect, useState } from "react";
import type { IChangeEvent } from "@rjsf/core";

export default function ContactForm() {
  const schema: RJSFSchema = {
    title: "Todo",
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string", title: "Name Surname" },
      phoneNumber: {
        type: "string",
        title: "Phone number",
        pattern: "^[0-9]{6,15}$",
      },
      certificated: { type: "boolean", title: "certificated?" },
    },
  };

  const uiSchema: UiSchema = {
    phoneNumber: {
      "ui:options": {
        inputType: "tel",
      },
      "ui:help": "Please enter a valid phone number, currently value is too short or too long",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    certificated: false,
  });

  let reactiveSchema = JSON.parse(JSON.stringify(schema));
  let reactiveUiSchema = JSON.parse(JSON.stringify(uiSchema));
  useEffect(() => {
    reactiveSchema = JSON.parse(JSON.stringify(schema));
    reactiveUiSchema = JSON.parse(JSON.stringify(uiSchema));
  }, [, uiSchema, schema]);

  const log = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Form
        schema={reactiveSchema}
        validator={validator}
        uiSchema={reactiveUiSchema}
        formData={formData}
        onChange={(e: IChangeEvent<RJSFSchema>) => setFormData(e.formData as typeof formData)}
        onSubmit={() => alert(JSON.stringify(formData))}
        onError={() => log("errors")}
        // onBlur={(target) => log(`blur ${target.split("_")[1]}`)}
        // onFocus={(target) => log(`focus ${target.split("_")[1]} `)}
      />
    </>
  );
}
