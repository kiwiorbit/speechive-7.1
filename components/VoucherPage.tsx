import React from 'react';
import { Page, VoucherInfo } from '../types';
import BeeLogo from './BeeLogo';

interface VoucherPageProps {
  voucher: VoucherInfo;
  setActivePage: (page: Page) => void;
}

const VoucherPage: React.FC<VoucherPageProps> = ({ voucher, setActivePage }) => {

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = `Redemption Request for Speechive Voucher: ${voucher.code}`;
    const body = `Hello Speechive Team,\n\nI would like to redeem my voucher.\n\nVoucher Code: ${voucher.code}\nAmount: $${voucher.amount}.00 NZD\nRedeemed By: ${voucher.redeemedTo}\nDate Issued: ${voucher.date}\n\nPlease let me know the next steps.\n\nThank you!`;
    const mailtoLink = `mailto:redeem@speechive.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <button onClick={() => setActivePage(Page.HoneyStore)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to store">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Redemption Voucher</h2>
          <p className="text-gray-500">Congratulations on your reward!</p>
        </div>
      </div>

      <div id="voucher-to-print" className="bg-white rounded-lg shadow-lg p-6 border-4 border-amber-300 border-dashed relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100/50 rounded-full"></div>
        <div className="absolute -bottom-16 -left-8 w-40 h-40 bg-amber-100/50 rounded-full"></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-start pb-4 border-b-2 border-gray-100">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Reward Voucher</h3>
                    <p className="text-sm text-gray-500">Issued by Speec<span className="text-amber-500">hive</span></p>
                </div>
                <BeeLogo className="w-12 h-12" />
            </div>

            <div className="grid grid-cols-2 gap-6 my-6 text-center">
                <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Amount</p>
                    <p className="text-4xl font-bold text-amber-500">${voucher.amount}.00</p>
                    <p className="text-sm font-semibold text-gray-600">NZD</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-semibold uppercase">Voucher Code</p>
                    <p className="text-lg font-mono font-bold text-gray-700 tracking-widest">{voucher.code}</p>
                </div>
            </div>

            <div className="text-sm space-y-1 bg-amber-50 p-4 rounded-lg">
                <p><span className="font-semibold w-24 inline-block text-amber-800">Redeemed To:</span> <span className="text-amber-700">{voucher.redeemedTo}</span></p>
                <p><span className="font-semibold w-24 inline-block text-amber-800">Date Issued:</span> <span className="text-amber-700">{voucher.date}</span></p>
            </div>
            
            <p className="text-xs text-gray-400 mt-6 text-center">
                To complete your redemption, please email this voucher to the organization.
            </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button
            onClick={handlePrint}
            className="w-full flex items-center justify-center py-3 px-4 space-x-2 rounded-lg bg-sky-500 text-white font-bold shadow-md hover:bg-sky-600 transition-colors"
        >
            <i className="fas fa-print"></i>
            <span>Print</span>
        </button>
        <button
            onClick={handleEmail}
            className="w-full flex items-center justify-center py-3 px-4 space-x-2 rounded-lg bg-green-500 text-white font-bold shadow-md hover:bg-green-600 transition-colors"
        >
            <i className="fas fa-paper-plane"></i>
            <span>Email to Redeem</span>
        </button>
      </div>

    </div>
  );
};

export default VoucherPage;
