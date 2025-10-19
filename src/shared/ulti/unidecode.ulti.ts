import unidecode from 'unidecode';

export const convertTextToSlug = (text: string): string => {
    const unidecodeText = unidecode(text.trim());
    return unidecodeText.replace(/\s+/g, '-');
}