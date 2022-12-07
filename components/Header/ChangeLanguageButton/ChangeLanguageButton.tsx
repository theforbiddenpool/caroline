import type { Dispatch, RefObject, SetStateAction } from 'react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnClickOutside } from '../../hooks';
import { lngName, lngFlag } from './language';

interface LanguageItemProps {
  locale: string;
}

function LanguageItem({ locale }: LanguageItemProps) {
  return (
    <li className="mb-2">
      <Link
        href={(locale === 'en') ? '/' : `/${locale}`}
        locale={locale}
        className="block px-4 py-2"
      >
        <span className="mr-1">{lngFlag[locale]}</span>
        {' '}
        {lngName[locale]}
      </Link>
    </li>
  );
}

interface DropdownProps {
  setShow: Dispatch<SetStateAction<boolean>>
  parentRef: RefObject<HTMLButtonElement>
}

function Dropdown({ setShow, parentRef }: DropdownProps) {
  useOnClickOutside(parentRef, () => setShow(false));

  return (
    <ul className="absolute bg-lime-100 -left-24 mt-4 w-36">
      <LanguageItem locale="en" />
      <LanguageItem locale="pt" />
    </ul>
  );
}

function ChangeLanguageDropdown() {
  const { i18n: { language: locale } } = useTranslation();
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative ml-3">
      <button type="button" onClick={() => setShow(!show)} ref={ref}>
        <span className="mr-1">{lngFlag[locale]}</span>
        {' '}
        {locale}
      </button>
      {show && (<Dropdown setShow={setShow} parentRef={ref} />)}
    </div>
  );
}

export default ChangeLanguageDropdown;
