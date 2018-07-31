export function removeMenu () {
  if (window.nowMenu) {
    document.body.removeChild(window.nowMenu.$el)
    window.nowMenu = undefined
  }
}
