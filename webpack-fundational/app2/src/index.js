import('app1/sayHello').then(res => {
  // res 为一个模块对象
  res.sayHello('app2 !!!!!!!');
});
