import { PlusIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

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
        <p className="text-slate-700 text-lg">No accounts connected</p>
        <p className="text-sm text-slate-400 mt-1 max-w-xs text-center">
          connect your first social platform to start scheduling and automating
          your content.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {accounts.map((account, index) => {
        const meta = PLATFORMS.find((p) => p.id === account.platform);
        if (!meta) return null;

        return (
          <div
            key={index}
            className="group bg-white border border-slate-200
                rounded-2xl p-5 flex items-center gap-4 hover:border-slate-300 transition-all"
          >
            <div>
              <meta.icon className="size-6 text-slate-500" />
            </div>
            <div>
              <div className="text-slate-900 truncate">{account.handle}</div>
              <div className="text-sm text-slate-500 mt-0.5">{meta.name}</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {account.status === "connected" ? <></> : <></>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountList;
