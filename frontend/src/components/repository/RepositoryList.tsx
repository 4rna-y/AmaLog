'use client';

import { IRepositoryModel } from "@/dto/repository.dto";
import { useEffect, useState } from "react";
import RepositoryCard from "./RepositoryCard";
import { RepositoryApi } from "@/api/repository";

const RepositoryList: React.FC = () =>
{
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
                setError("リポジトリの取得に失敗");
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repositories.map(repo => (
                <RepositoryCard key={repo.id} repository={repo}/>
            ))}
        </div>
    );
};

export default RepositoryList;
