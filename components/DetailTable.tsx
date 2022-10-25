import { useMemo, type FC, type ComponentPropsWithoutRef } from "react";
import { DefinitionList } from "smarthr-ui";
import {
  formatDate,
  formatStatus,
  formatChiefEmailVerified,
} from "../lib/item/utils";
import { type ItemSchema } from "../lib/item";

interface Props {
  item: ItemSchema;
}

type DefinitionListItemProps = ComponentPropsWithoutRef<
  typeof DefinitionList
>["items"];

export const DetailTable: FC<Props> = ({ item }) => {
  const items: DefinitionListItemProps = useMemo(
    () => [
      { term: "ID", description: item.id },
      { term: "物品名", description: item.name },
      { term: "危険物など特記事項", description: item.notes },
      { term: "保管場所", description: item.location },
      { term: "状態", description: formatStatus(item.status) },
      { term: "責任者の学生番号", description: item.chief_id },
      { term: "責任者の名前", description: item.chief_name },
      { term: "責任者の所属", description: item.chief_department },
      { term: "責任者のメールアドレス", description: item.chief_email },
      {
        term: "責任者のメールアドレスの確認状況",
        description: formatChiefEmailVerified(item.chief_email_verified),
      },
      { term: "申請日", description: formatDate(item.created_at) },
      { term: "更新日", description: formatDate(item.updated_at) },
      { term: "期限", description: formatDate(item.expires_at) },
      { term: "担当TA", description: item.confirmed_ta_name },
    ],
    [item]
  );

  return <DefinitionList items={items} />;
};
