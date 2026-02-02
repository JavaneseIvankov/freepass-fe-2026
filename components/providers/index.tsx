import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster as SonnerToaster } from "sonner";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [qc] = useState(() => createQueryClient());

	return (
		<QueryClientProvider client={qc}>
			{children}
			<Toaster />
		</QueryClientProvider>
	);
}

const Toaster = () => <SonnerToaster />;
const createQueryClient = () => {
	return new QueryClient();
};
