import swaggerJsdoc from 'swagger-jsdoc';
import CONFIG from "@/configs";
import SwaggerDoc from '@/components/swagger-doc';

const getData = async () => {
    const spec = swaggerJsdoc(CONFIG.jsDocs)

    return spec
}

const Docs = async () => {
    const data = await getData();
    return <SwaggerDoc spec={data} />
}

export default Docs