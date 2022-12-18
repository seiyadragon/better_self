import Head from "next/head";

type HeadManagerProps = {
    title: string,
    keywords: string,
    description: string
}

const HeadManager = ({title, keywords, description}: HeadManagerProps) => {
    return (
        <Head>
            <link rel="icon" href="/logo.png"/>
            <meta charSet="UTF-8" />
            <meta name="author" content="Self++" />

            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
        </Head>
    )
}; export default HeadManager