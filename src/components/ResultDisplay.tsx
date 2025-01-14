'use client';

import React from 'react';

interface ResultProps {
    data: {
        data: {
            server: string;
            name: string;
            idnName: string;
            status: string | string[];
            nameserver: string[];
            ips: string;
            created: string;
            changed: string;
            expires: string;
            registered: boolean;
            dnssec: boolean;
            whoisserver: string;
            contacts: unknown[];
            registrar: {
                id: string;
                name: string;
                email: string | null;
                url: string | null;
            };
            network: unknown | null;
            parsedContacts: boolean;
            template: Record<string, string>;
            message?: string
        };
        source: string;
    } | null;
    error: string | null;
    loading: boolean;
}

const ResultDisplay: React.FC<ResultProps> = ({ data, error, loading }) => {
    if (!data) {
        return (
            <div className="mt-4 text-center p-4 text-gray-700 bg-gray-100 border border-gray-500 rounded-lg shadow-md">
              Please enter a domain or IP address to find the detais.
            </div>
          );
    }

    const { data: details, source } = data;
    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error || !details.status) {
        return (
          <div className="mt-4 text-center p-4 text-red-500 bg-red-100 border border-red-500 rounded-lg shadow-md">
            <strong>Error:</strong> {error || "Something went wrong. Please try again."}
          </div>
        );
      }
      
      if (typeof details.status === 'string' && details.status === 'fail') {
        return (
          <div className="mt-4 text-center p-4 text-gray-700 bg-gray-100 border border-gray-500 rounded-lg shadow-md">
            {details?.message}
          </div>
        );
      }
      

    return (
        <div className="mt-4 border p-4 rounded bg-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">WHOIS Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <strong>Server:</strong> {details.server}
                </div>
                <div>
                    <strong>Domain Name:</strong> {details.name}
                </div>
                <div>
                    <strong>IDN Name:</strong> {details.idnName}
                </div>
                <div>
                    <strong>Status:</strong>{' '}
                    <a
                        href={typeof details.status === 'string' ? details.status.split(' ')[1] : details.status[0].split(' ')[1]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {typeof details.status === 'string' ? details.status.split(' ')[0] : details.status[0].split(' ')[0]}
                    </a>
                </div>
                <div>
                    <strong>IP Address:</strong> {details.ips}
                </div>
                <div>
                    <strong>Created:</strong> {details.created}
                </div>
                <div>
                    <strong>Last Changed:</strong> {details.changed}
                </div>
                <div>
                    <strong>Expires:</strong> {details.expires}
                </div>
                <div>
                    <strong>Registered:</strong> {details.registered ? 'Yes' : 'No'}
                </div>
                <div>
                    <strong>DNSSEC:</strong> {details.dnssec ? 'Enabled' : 'Disabled'}
                </div>
                <div>
                    <strong>Whois Server:</strong> {details.whoisserver}
                </div>
                <div className={`p-2 rounded text-center ${source === 'cache' ? 'bg-green-200' : 'bg-yellow-200'}`}>
                    <strong>Source:</strong> {source}
                </div>
            </div>

            <h3 className="text-xl font-bold mt-4">Registrar Information</h3>
            <div className="space-y-2">
                <div>
                    <strong>ID:</strong> {details.registrar.id}
                </div>
                <div>
                    <strong>Name:</strong> {details.registrar.name}
                </div>
                <div>
                    <strong>Email:</strong> {details.registrar.email || 'N/A'}
                </div>
                <div>
                    <strong>URL:</strong> {details.registrar.url || 'N/A'}
                </div>
            </div>

            <h3 className="text-xl font-bold mt-4">Nameservers</h3>
            <div className="overflow-x-auto max-h-40">
                <ul className="list-disc pl-5 space-y-2">
                    {details.nameserver.map((ns, index) => (
                        <li key={index}>{ns}</li>
                    ))}
                </ul>
            </div>

            <h3 className="text-xl font-bold mt-4">Template Information</h3>
            <div className="overflow-x-auto max-h-40">
                <ul className="list-disc pl-5 space-y-2">
                    {Object.entries(details.template).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResultDisplay;
