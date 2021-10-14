import { useCookies } from 'react-cookie'

export function useLanguage()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    
    return {
        locale: cookies['__language'] || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'vi',
        setLocale: (locale: string) => setCookie('__language', locale),
        removeLocale: () => removeCookie('__language')
    }
}