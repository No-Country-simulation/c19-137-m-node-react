import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs as UITabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import MisPosts from '@/components/cards/misPosts'

export default function Tabs() {
    return (
        <div className="flex justify-center items-center w-full mt-10 m-2 p-2">
            <UITabs defaultValue="account" className="w-full max-w-4xl">
                <TabsList className="grid w-full grid-cols-3 gap-2">
                    <TabsTrigger value="libros">Libros</TabsTrigger>
                    <TabsTrigger value="MisPost">Mis Post</TabsTrigger>
                    <TabsTrigger value="MisSeguidos">Mis Seguidos</TabsTrigger>
                </TabsList>
                <TabsContent value="libros">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardDescription>
                                {/* Mis Libros */}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* <p>Contenido de mis libros</p> */}
                        </CardContent>
                        <CardFooter>
                            {/* Footer content */}
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="MisPost">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardDescription>
                                Mis Post
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <MisPosts />
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* Footer content */}
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="MisSeguidos">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardDescription>
                                {/* Mis Seguidores */}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                {/* Contenido de mis seguidos */}
                            </div>
                        </CardContent>
                        <CardFooter>
                            {/* Footer content */}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </UITabs>
        </div>
    )
}
