import {Accordion} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import ButtonAuth from '@/components/ButtonAuth'
import {gql} from "@apollo/client";

const POST_QUERY = gql`
    query Posts {
        posts {
            id
            title
            content
            created_at
        }
    }
`;

export default async function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ButtonAuth/>
        </main>
    );
}
