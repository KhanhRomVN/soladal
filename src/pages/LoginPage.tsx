import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-purple-900 flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <span className="mr-2">◆</span> Soladal
                </h1>
            </div>
            <div className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-gray-900 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                    <p className="text-gray-400">to continue to Soladal</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Input type="text" placeholder="Email or username" className="bg-gray-800 border-red-500" />
                        <p className="text-red-500 text-sm mt-1">This field is required</p>
                    </div>
                    <div>
                        <Input type="password" placeholder="Password" className="bg-gray-800 border-red-500" />
                        <p className="text-red-500 text-sm mt-1">This field is required</p>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign in</Button>
                </CardContent>
            </Card>
            </div>
        </div>
    );
};


export default LoginPage;