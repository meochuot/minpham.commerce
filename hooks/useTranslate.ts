import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
export function useTranslate(id: string, params?: any) {   
    const [message, setMessage] = useState<string>()
    const intl = useIntl();
    const { locale } = useRouter()
    
    useEffect( () => {
        let msg = intl.formatMessage({id: id}, {values: params})
        setMessage(msg)
    },[id, params, locale]);

    return message;
}