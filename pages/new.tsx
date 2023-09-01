import { useCallback, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Heading } from "smarthr-ui";
import { toast } from "react-toastify";
import { type NextPageWithLayout } from "./_app";
import { getCenterLayout } from "../layouts/Center";
import { Form } from "../components/Form";
import { itemSchemaForCreate, type ItemSchemaForCreate } from "../lib/item";
import { client } from "../lib/next/apiClient";
import { FormProvider, useForm } from "react-hook-form";
import { getNextExpiresDate, itemId } from "../lib/item/utils";
import { formatISO } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";

const sleep = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const New: NextPageWithLayout = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: ItemSchemaForCreate) => {
      const res = await client.new(data);
      console.log(data);
      console.log(res);

      if (!res.data.ok) {
        toast.error(`保存に失敗しました。\n${res.data.message}`);
        return;
      }

      toast.success("保存しました！");

      await sleep(1000);

      router.push(`/detail/${data.id}`);
    },
    [router]
  );

  const expires_at = useMemo(
    () => formatISO(getNextExpiresDate(new Date())),
    []
  );

  const defaultValues = useMemo(
    () => ({
      notes: "",
      location: "スクエア廊下",
      expires_at: expires_at.includes("+")
        ? expires_at.split("+")[0]
        : expires_at,
    }),
    [expires_at]
  );

  const defaultValuesForReset = useMemo(
    () => ({
      id: itemId(),
      ...defaultValues,
      // ...props.defaultValues,
    }),
    [defaultValues]
  );

  const methods = useForm<ItemSchemaForCreate>({
    defaultValues: defaultValuesForReset,
    resolver: zodResolver(itemSchemaForCreate, {}, { mode: "sync" }),
  });

  const handleReset = useCallback(() => {
    methods.reset({ ...defaultValuesForReset });
  }, [methods, defaultValuesForReset]);

  return (
    <>
      <Head>
        <title>インキュベーションスクエア物品管理システム - 登録</title>
      </Head>

      <Heading type="screenTitle" tag="h1">
        新規登録
      </Heading>
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit(handleSubmit, (errors) => {
            console.log(errors);
          })}
        />
      </FormProvider>
    </>
  );
};

export default New;

New.getLayout = getCenterLayout;
