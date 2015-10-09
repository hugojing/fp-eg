var _ = require('underscore-node');

function lyricSegment(n) {
  return _.chain([])
  // chain 返回一个封装对象，在封装的对象上可以调用方法
  // 直到 value 方法调用为止
    .push(n + ' bottles of beer on the wall')
    .push(n + ' bottles of beer')
    .push('Take one down, pass it around')
    .tap(function(lyrics) {
      // tap(object, interceptor) 
      // 作为函数链式调用的一环, 为了对此对象执行操作并返回对象本身。
      if (n > 1)
        lyrics.push((n - 1) + ' bottles of beer on the wall');
      else
        lyrics.push('No more bottles of beer on the wall!');
    })
    .value();
    // 获取封装对象的最终值
};

// console.log(lyricSegment(9));
// result:
// [ '9 bottles of beer on the wall',
//   '9 bottles of beer',
//   'Take one down, pass it around',
//   '8 bottles of beer on the wall' ]

function song(start, end, lyricGen) {
  return _.reduce(_.range(start, end, -1),
    // reduce(list, iteratee, [memo], [context]) 
    // reduce方法把list中元素归结为一个单独的数值
    // reduce的每一步都需要由iteratee返回
    // Memo是reduce函数的初始值
    function(acc, n) {
      return acc.concat(lyricGen(n));
    }, []);
};

// range([start], stop, [step]) 
// 用来创建整数灵活编号 list 的函数
// 起点，终点，每个增加/减少的数值


console.log(song(99, 0, lyricSegment));