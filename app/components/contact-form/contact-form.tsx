import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const schema: RJSFSchema = {
    title: "Todo",
    type: "object",
    required: ["title", "done"],
    properties: {
      title: { type: "string", title: "Title" },
      numberValue: { type: "number", title: "Number" },
      done: { type: "boolean", title: "Done?" },
    },
  };

  const uiSchema: UiSchema = {
    "ui:globalOptions": {
      copyable: true,
    },
  };

  const [formData, setFormData] = useState({
    title: "A new task",
    numberValue: 15,
    done: false,
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
        onChange={(e) => (setFormData(e.formData), log("changed"))}
        onSubmit={() => alert(JSON.stringify(formData))}
        onError={() => log("errors")}
        // onBlur={(target) => log(`blur ${target.split("_")[1]}`)}
        // onFocus={(target) => log(`focus ${target.split("_")[1]} `)}
      />
    </>
  );
}
