"use client";

import { Mail, Phone } from "lucide-react";
import { GithubIcon, NotionIcon } from "@/components/ui/svg";

const CONTACT_INFO = {
  name: "이신행",
  phone: "010-4923-7664",
  email: "sinhaeng123@gmail.com",
  github: "https://github.com/akfangus",
  notion:
    "https://steady-abrosaurus-ff3.notion.site/Lee-Shin-Heang-dddadbce0f284626b2ee320146722848?source=copy_link",
} as const;

export function Profile(): React.ReactElement {
  return (
    <div className="w-full max-w-2xs sm:max-w-xl bg-white shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md my-10 animate-zoom-in">
      <div className="flex flex-col sm:flex-row sm:min-h-[280px]">
        {/* 상단/왼쪽: 이름과 직책 */}
        <div className="px-8 py-6 sm:py-6 sm:w-2/5 flex flex-col justify-between items-center sm:items-start text-center sm:text-left border-b sm:border-b-0 sm:border-r border-gray-200 relative">
          {/* 상단 포인트 라인 */}
          <div className="absolute top-0 left-0 w-30 h-1 bg-linear-to-r from-blue-600 to-indigo-600" />

          <div className="space-y-3 mt-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {CONTACT_INFO.name}
            </h2>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="w-12 h-px bg-linear-to-r from-blue-500 to-transparent mr-6" />
              <p className="text-sm text-gray-600 font-light tracking-wide">
                Frontend Developer
              </p>
            </div>
          </div>

          {/* 소셜 링크 - 데스크톱에서만 표시 */}
          <div className="hidden sm:flex w-full items-center justify-end gap-3">
            <a
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 hover:bg-blue-50 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </a>
            <a
              href={CONTACT_INFO.notion}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 hover:bg-blue-50 transition-all duration-300 group"
              aria-label="Notion"
            >
              <NotionIcon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* 중단/오른쪽: 연락처 정보 */}
        <div className="px-8 py-6 sm:py-10 sm:w-3/5 w-full flex flex-col justify-center items-end sm:justify-end border-b sm:border-b-0 border-gray-200">
          {/* 연락처 정보 상단 장식 - 데스크톱에서만 표시 */}
          <div className="hidden sm:flex flex-col items-start w-full mb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-px bg-linear-to-r from-blue-500 to-transparent" />
              <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">
                Contact
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-blue-400" />
              <div className="w-1 h-1 bg-blue-500" />
              <div className="w-1 h-1 bg-indigo-500" />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* 전화번호 */}
            <div className="flex items-start gap-4 group border-l-2 border-transparent hover:border-blue-600 pl-4 -ml-4 transition-all duration-300">
              <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1.5">
                  Phone
                </p>
                <p className="text-sm text-gray-900 font-normal">
                  {CONTACT_INFO.phone}
                </p>
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex items-start gap-4 group border-l-2 border-transparent hover:border-blue-600 pl-4 -ml-4 transition-all duration-300">
              <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1.5">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-gray-900 hover:text-blue-600 transition-colors font-normal break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 소셜 링크 - 모바일에서만 표시 */}
        <div className="px-8 py-6 sm:hidden flex items-center justify-center gap-4 bg-linear-to-r from-blue-50 to-indigo-50">
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 hover:bg-white hover:shadow-sm transition-all duration-300 group"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </a>
          <a
            href={CONTACT_INFO.notion}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 hover:bg-white hover:shadow-sm transition-all duration-300 group"
            aria-label="Notion"
          >
            <NotionIcon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
