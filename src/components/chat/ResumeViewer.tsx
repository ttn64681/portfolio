'use client';

export default function ResumeViewer() {
  return (
    <div className='chat-message chat-message--assistant w-full pl-[clamp(3.5rem,5.4rem,4.5rem)] pr-[2.7rem] mt-2'>
      <div className='chat-message__content'>
        <div className='w-full] max-w-[700px] h-[500px] rounded-xl overflow-hidden bg-[#010a14] border border-[#4dbdff]/40 shadow-[0_18px_40px_rgba(0,0,0,0.85)]'>
          <object data='/api/resume' type='application/pdf' width='100%' height='100%'>
            <p className='px-4 py-3 text-xs text-white-title/80 font-pixel-mono'>
              PDF preview is not available in this browser. You can{' '}
              <a href='/api/resume' className='underline text-[#4dbdff]'>
                download the resume here
              </a>
              .
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
