'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle, XCircle, AlertTriangle, Plus, Eye, Settings, Shield } from 'lucide-react';

interface BankAccount {
  _id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings' | 'business';
  status: 'connected' | 'pending' | 'failed' | 'suspended';
  lastSync: string;
  balance?: number;
  isDefault: boolean;
}

export default function BankAccounts() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectFormData, setConnectFormData] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking' as 'checking' | 'savings' | 'business',
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockAccounts: BankAccount[] = [
      {
        _id: '1',
        accountName: 'Primary Business Account',
        bankName: 'Chase Bank',
        accountNumber: '****1234',
        routingNumber: '021000021',
        accountType: 'business',
        status: 'connected',
        lastSync: '2024-08-11T10:30:00Z',
        balance: 15750.00,
        isDefault: true
      },
      {
        _id: '2',
        accountName: 'Operations Account',
        bankName: 'Bank of America',
        accountNumber: '****5678',
        routingNumber: '121000358',
        accountType: 'checking',
        status: 'connected',
        lastSync: '2024-08-11T09:15:00Z',
        balance: 23400.50,
        isDefault: false
      },
      {
        _id: '3',
        accountName: 'Savings Account',
        bankName: 'Wells Fargo',
        accountNumber: '****9012',
        routingNumber: '121000248',
        accountType: 'savings',
        status: 'pending',
        lastSync: '2024-08-10T14:20:00Z',
        isDefault: false
      },
      {
        _id: '4',
        accountName: 'Backup Account',
        bankName: 'Citibank',
        accountNumber: '****3456',
        routingNumber: '021000089',
        accountType: 'checking',
        status: 'failed',
        lastSync: '2024-08-09T16:45:00Z',
        isDefault: false
      }
    ];

    setTimeout(() => {
      setAccounts(mockAccounts);
      setLoading(false);
    }, 1000);
  }, []);

  const connectedAccounts = accounts.filter(a => a.status === 'connected').length;
  const totalBalance = accounts
    .filter(a => a.status === 'connected' && a.balance)
    .reduce((sum, account) => sum + (account.balance || 0), 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'suspended': return <Shield className="h-5 w-5 text-orange-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'business': return 'bg-purple-100 text-purple-800';
      case 'checking': return 'bg-blue-100 text-blue-800';
      case 'savings': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bank accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bank Account Management</h1>
                <p className="text-sm text-gray-600 mt-1">Connect and manage payment processing accounts</p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Accounts</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{connectedAccounts}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${totalBalance.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Connections</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">
                  {accounts.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Connections</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {accounts.filter(a => a.status === 'failed').length}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bank Accounts</h2>
              <p className="text-sm text-gray-600">Manage connected bank accounts for payments</p>
            </div>
            <button
              onClick={() => setShowConnectModal(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Connect Account
            </button>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account._id} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{account.accountName}</h3>
                    <p className="text-xs text-gray-600">{account.bankName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {account.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Default
                    </span>
                  )}
                  {getStatusIcon(account.status)}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Account Number</p>
                  <p className="text-sm font-mono text-gray-900">{account.accountNumber}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Account Type</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccountTypeColor(account.accountType)}`}>
                      {account.accountType}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.status)}`}>
                      {account.status}
                    </span>
                  </div>
                </div>

                {account.balance && (
                  <div>
                    <p className="text-xs text-gray-500">Current Balance</p>
                    <p className="text-lg font-bold text-gray-900">${account.balance.toLocaleString()}</p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500">Last Sync</p>
                  <p className="text-xs text-gray-600">{new Date(account.lastSync).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-150">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    setSelectedAccount(account);
                    setShowSettingsModal(true);
                  }}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  <Settings className="h-3.5 w-3.5 mr-1" />
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>

        {accounts.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bank accounts connected</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Connect your bank accounts to enable payment processing and financial management.
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Connect First Account
            </button>
          </div>
        )}

        {/* Settings Modal */}
        {showSettingsModal && selectedAccount && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Account Settings</h3>
                      <p className="text-sm text-blue-100">{selectedAccount.accountName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowSettingsModal(false);
                      setSelectedAccount(null);
                    }}
                    className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 space-y-3">
                {/* Account Info */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Account Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">{selectedAccount.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account:</span>
                      <span className="font-mono">{selectedAccount.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize">{selectedAccount.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedAccount.status)}`}>
                        {selectedAccount.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Settings Options */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">Account Settings</h4>

                  {/* Default Account Toggle */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Set as Default</p>
                      <p className="text-xs text-gray-600">Use this account for primary transactions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAccount.isDefault}
                        onChange={() => {
                          // Handle default account toggle
                          alert(`Default account setting would be updated for ${selectedAccount.accountName}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Auto-sync Toggle */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Auto-sync Balance</p>
                      <p className="text-xs text-gray-600">Automatically sync account balance daily</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={selectedAccount.status === 'connected'}
                        onChange={() => {
                          // Handle auto-sync toggle
                          alert(`Auto-sync setting would be updated for ${selectedAccount.accountName}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Notification Settings */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Balance Alerts</p>
                      <p className="text-xs text-gray-600">Receive notifications for balance changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        onChange={() => {
                          // Handle notification toggle
                          alert(`Balance alerts setting would be updated for ${selectedAccount.accountName}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to disconnect ${selectedAccount.accountName}?`)) {
                        alert(`Account ${selectedAccount.accountName} would be disconnected`);
                        setShowSettingsModal(false);
                        setSelectedAccount(null);
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
                  >
                    Disconnect Account
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowSettingsModal(false);
                        setSelectedAccount(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        alert(`Settings saved for ${selectedAccount.accountName}`);
                        setShowSettingsModal(false);
                        setSelectedAccount(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showConnectModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100 sm:scale-100">
      {/* Modal Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Connect Bank Account
              </h3>
              <p className="text-xs text-green-100">
                Link a new bank account for payments
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowConnectModal(false);
              setConnectFormData({
                bankName: '',
                accountName: '',
                accountNumber: '',
                routingNumber: '',
                accountType: 'checking',
              });
            }}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
            alert(`Connecting account: ${connectFormData.accountName} at ${connectFormData.bankName}`);
            setShowConnectModal(false);
            setConnectFormData({
              bankName: '',
              accountName: '',
              accountNumber: '',
              routingNumber: '',
              accountType: 'checking',
            });
          }}
          className="space-y-2"
        >
          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="connect-bankName" className="block text-sm sm:text-base font-semibold text-gray-900">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="connect-bankName"
              value={connectFormData.bankName}
              onChange={(e) => setConnectFormData({ ...connectFormData, bankName: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              placeholder="e.g., Chase Bank, Bank of America"
              required
            />
            <p className="text-xs text-gray-500">Enter the full name of your bank</p>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="connect-accountName" className="block text-sm sm:text-base font-semibold text-gray-900">
              Account Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="connect-accountName"
              value={connectFormData.accountName}
              onChange={(e) => setConnectFormData({ ...connectFormData, accountName: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              placeholder="e.g., Primary Business Account"
              required
            />
            <p className="text-xs text-gray-500">Choose a descriptive name for this account</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="connect-accountNumber" className="block text-sm sm:text-base font-semibold text-gray-900">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="connect-accountNumber"
                value={connectFormData.accountNumber}
                onChange={(e) => setConnectFormData({ ...connectFormData, accountNumber: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white font-mono text-sm"
                placeholder="123456789"
                required
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <label htmlFor="connect-routingNumber" className="block text-sm sm:text-base font-semibold text-gray-900">
                Routing Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="connect-routingNumber"
                value={connectFormData.routingNumber}
                onChange={(e) => setConnectFormData({ ...connectFormData, routingNumber: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white font-mono text-sm"
                placeholder="021000021"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label htmlFor="connect-accountType" className="block text-sm sm:text-base font-semibold text-gray-900">
              Account Type <span className="text-red-500">*</span>
            </label>
            <select
              id="connect-accountType"
              value={connectFormData.accountType}
              onChange={(e) => setConnectFormData({ ...connectFormData, accountType: e.target.value as 'checking' | 'savings' | 'business' })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              required
            >
              <option value="checking">Checking Account</option>
              <option value="savings">Savings Account</option>
              <option value="business">Business Account</option>
            </select>
            <p className="text-xs text-gray-500">Select the type of bank account</p>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-2">
                <h4 className="text-xs font-medium text-blue-800">Secure Connection</h4>
                <p className="text-xs text-blue-700 mt-0.5">
                  Your bank information is encrypted and securely stored. We use bank-level security to protect your data.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowConnectModal(false);
                setConnectFormData({
                  bankName: '',
                  accountName: '',
                  accountNumber: '',
                  routingNumber: '',
                  accountType: 'checking',
                });
              }}
              className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Connect Account
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
        )}

    </div>
    </div>
  );
}
