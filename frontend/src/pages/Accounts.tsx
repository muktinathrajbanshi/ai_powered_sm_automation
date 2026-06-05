import { useState } from "react";

const Accounts = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header  */}
      <div>
        <div>
          <h2>Connected Accounts</h2>
          <p>{accounts.length}</p>
        </div>
        <button></button>
      </div>

      {/* Platform picker modal  */}

      {/* Connected accounts list  */}
    </div>
  );
};

export default Accounts;
