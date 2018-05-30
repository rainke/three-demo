import animate from './learn/1';
animate();

if(module.hot) {
  // module.hot.dispose(() => {
  //   location.reload();
  // })
  module.hot.accept(function () {
    location.reload();
  });    
}