import React from 'react';
import { Topic } from './types';

// Icons using SVG strings for simplicity
export const Icons = {
  Atom: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
    </svg>
  ),
  Bolt: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Wave: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  ),
  Scale: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A5.974 5.974 0 0121.38 8.9c.967 2.595.487 5.45-1.178 7.61m-15.002 0a5.974 5.974 0 01-1.178-7.61 5.974 5.974 0 012.632-3.93M12 3c-3.315 0-6 2.685-6 6a6 6 0 0012 0c0-3.315-2.685-6-6-6z" />
    </svg>
  ),
  Chat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  Quiz: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  Chart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
};

export const PHYSICS_TOPICS: Topic[] = [
  { id: 'mechanics', name: 'Cơ học', icon: <Icons.Scale className="w-6 h-6" />, description: 'Động lực học, Dao động cơ, Sóng cơ', grade: 12 },
  { id: 'electricity', name: 'Điện học', icon: <Icons.Bolt className="w-6 h-6" />, description: 'Dòng điện xoay chiều, Dao động điện từ', grade: 12 },
  { id: 'waves', name: 'Sóng ánh sáng', icon: <Icons.Wave className="w-6 h-6" />, description: 'Giao thoa, Tán sắc, Quang phổ', grade: 12 },
  { id: 'nuclear', name: 'Vật lý hạt nhân', icon: <Icons.Atom className="w-6 h-6" />, description: 'Phóng xạ, Phản ứng nhiệt hạch', grade: 12 },
];

export const INITIAL_SYSTEM_INSTRUCTION = `
Bạn là một gia sư Vật Lý cấp 3 (THPT) tại Việt Nam. Tên của bạn là PhysiTutor.
Nhiệm vụ của bạn là giúp học sinh hiểu bài, giải bài tập và ôn thi THPT Quốc gia.

Phong cách trả lời:
1. Thân thiện, kiên nhẫn, khích lệ học sinh.
2. Giải thích đi từ cơ bản đến nâng cao. Sử dụng ví dụ thực tế.
3. Khi giải bài tập:
   - Tóm tắt đề bài.
   - Nêu công thức áp dụng.
   - Thay số và tính toán từng bước.
   - Kết luận rõ ràng.
4. Sử dụng định dạng Markdown để trình bày công thức cho dễ đọc (ví dụ: dùng ký hiệu ^, _, hoặc viết rõ tên đại lượng). Đừng dùng LaTeX phức tạp nếu không cần thiết vì giao diện có thể không hiển thị đúng, hãy ưu tiên text rõ ràng.
5. Nếu câu hỏi không liên quan đến Vật lý, hãy lịch sự từ chối và hướng học sinh quay lại bài học.
`;
