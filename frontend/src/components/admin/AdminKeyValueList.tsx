"use client";

import { IKeyValueModel } from "@/dto/keyvalue.dto";
import { useEffect, useState } from "react";
import AdminKeyValueItem from "./AdminKeyValueItem";
import { KeyValueApi } from "@/api/kv";

const AdminKeyValueList: React.FC = () => {
    const [keyvalues, setKeyValues] = useState<IKeyValueModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchKeyValues = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await KeyValueApi.getAll();
                if (data) setKeyValues(data);
            }
            catch (err) {
                setError("Failed to fetch key-value pairs");
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchKeyValues();
    }, []);

    if (loading) {
        return ( <div className="text-center py-8">Loading...</div> );
    }

    if (error.length !== 0) {
        return ( <div className="text-center py-8 text-red-500">{error}</div> );
    }

    return (
        <div className="space-y-4">
            {keyvalues?.map(kv => (
                <AdminKeyValueItem key={kv.key} kvData={kv}/>
            ))}
        </div>
    );
};

export default AdminKeyValueList;
