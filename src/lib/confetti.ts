export function fireConfetti() {
  const colors = ['#4F80FF','#22C97A','#FF7A2F','#F59E0B','#EC4899']
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div')
    el.className = 'conf'
    el.style.cssText = `
      left:${Math.random()*100}vw;
      top:-10px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-delay:${Math.random()*0.5}s;
      animation-duration:${1.2+Math.random()*0.6}s;
    `
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }
}
