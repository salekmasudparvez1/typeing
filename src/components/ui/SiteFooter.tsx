export function SiteFooter() {
  return (
    <div className="pointer-events-none fixed bottom-3 left-1/2 z-40 -translate-x-1/2 px-4 py-1.5 rounded-full border border-white/10 bg-black/30 text-[11px] text-muted backdrop-blur-xl shadow-[0_0_24px_rgba(0,0,0,0.2)] flex items-center gap-2">
      <span>Made by Salek Masud Parvez</span>
      <span className="text-white/20">•</span>
      <a 
        href="https://github.com/salekmasudparvez1/typeing" 
        target="_blank" 
        rel="noreferrer"
        className="hover:text-foreground transition-colors pointer-events-auto"
      >
        GitHub
      </a>
    </div>
  );
}