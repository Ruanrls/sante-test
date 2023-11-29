import { api } from "@/trpc/server";
import { Title } from "@/components/sante/title";
import { ContactList } from "@/components/sante/contact-list";

export default async function Home() {
  const contacts = await api.contact.getFiltered.query();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col gap-y-8 py-12">
        <Title>My contacts:</Title>

        <ContactList initialContacts={contacts} />
      </div>
    </main>
  );
}
