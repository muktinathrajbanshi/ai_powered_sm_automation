import { PlusIcon } from "lucide-react";

interface AccountListProps {
  accounts: any[];
  onDisconnect: (accountId: string) => Promise<void>;
}

const AccountList = ({ accounts, onDisconnect }: AccountListProps) => {
  const handleDisconnect = async (accountId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to disconnect this account?",
    );
    if (!confirm) return;
    await onDisconnect(accountId);
  };

  if (accounts.length === 0) {
    return (
      <div
        className="bg-white rounded-2xl border-2 border-dashed border-slate-200
        flex flex-col items-center justify-center py-20 px-6"
      >
        <div
          className="bg-white rounded-2xl border-2 border-dashed border-slate-200
        flex flex-col items-center justify-center py-20 px-6"
        >
          <PlusIcon className="size-6 text-slate-500 opacity-50" />
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default AccountList;
