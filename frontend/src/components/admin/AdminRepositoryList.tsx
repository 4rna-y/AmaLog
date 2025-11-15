"use client";

import { IRepositoryModel } from "@/dto/repository.dto";
import { useEffect, useState } from "react";
import AdminRepositoryItem from "./AdminRepositoryItem";
import { RepositoryApi } from "@/api/repository";

const AdminRepositoryList: React.FC = () => {
    const [repositories, setRepositories] = useState<IRepositoryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await RepositoryApi.getRepositories();
                if (data) setRepositories(data);
            }
            catch (err) {
                setError("Failed to fetch repositories");
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, []);

    if (loading) {
        return ( <div className="text-center py-8">Loading...</div> );
    }

    if (error.length !== 0) {
        return ( <div className="text-center py-8 text-red-500">{error}</div> );
    }

    return (
        <div className="space-y-4">
            {repositories?.map(repository => (
                <AdminRepositoryItem key={repository.id} repositoryData={repository}/>
            ))}
        </div>
    );
};

export default AdminRepositoryList;
