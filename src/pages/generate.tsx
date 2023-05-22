import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("Mutation finished", data);
    },
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    generateIcon.mutate({
      prompt: form.prompt,
    });
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <FormGroup>
            <label>Prompt</label>
            <Input value={form.prompt} onChange={updateForm("prompt")}></Input>
          </FormGroup>
          <button className="rounded bg-blue-400 px-4 py-2 hover:bg-blue-950">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
