// customize-home-data.js

// version
var lastCommitTime = '2016-10-09T02:50:40Z';
var version = moment(lastCommitTime, 'YYYY-MM-DDTh:mm:ssZ').fromNow();

// search
var searchServices = {
    'baidu': {
        'name': '百度',
        'url': 'http://www.baidu.com/s?wd=',
        'suffix': ''
    },
    'google': {
        'name': '谷歌',
        'url': 'http://www.google.com/search?q=',
        'suffix': ''
    },
    'googlemirror': {
        'name': '谷歌镜像',
        'url': 'http://www.acgn.ren/search?q=',
        'suffix': ''
    },
    'googlemirror2': {
        'name': '谷歌镜像2',
        'url': 'http://google.hbspy.moe/#q=',
        'suffix': ''
    },
    'baiduxueshu': {
        'name': '百度学术',
        'url': 'http://xueshu.baidu.com/s?wd=',
        'suffix': ''
    },
    'googlescholar': {
        'name': '谷歌学术',
        'url': 'http://scholar.google.com/scholar?q=',
        'suffix': ''
    },
    'jd': {
        'name': '京东',
        'url': 'http://search.jd.com/Search?keyword=',
        'suffix': '&enc=utf-8'
    },
    'taobao': {
        'name': '淘宝',
        'url': 'https://s.taobao.com/search?q=',
        'suffix': ''
    },
    'wechat': {
        'name': '微信',
        'url': 'http://weixin.sogou.com/weixin?query=',
        'suffix': ''
    },
    'zhihu': {
        'name': '知乎',
        'url': 'http://www.zhihu.com/search?q=',
        'suffix': ''
    },
    'weibo': {
        'name': '微博',
        'url': 'http://s.weibo.com/weibo/',
        'suffix': ''
    },
    'douban': {
        'name': '豆瓣',
        'url': 'http://www.douban.com/search?q=',
        'suffix': ''
    },
    'music': {
        'name': '音乐',
        'url': 'http://music.hao123.com/search?key=',
        'suffix': ''
    },
    'panci': {
        'name': '胖次',
        'url': 'http://www.panc.cc/s/',
        'suffix': '/td_0'
    },
    'byr': {
        'name': '北邮人论坛',
        'url': 'http://search.icybee.cn/bbs/?key=',
        'suffix': ''
    },
    'byrauthor': {
        'name': '北邮人论坛用户',
        'url': 'http://search.lovezxp.com/?type=author&text=',
        'suffix': ''
    },
    'byrarticle': {
        'name': '北邮人论坛文章',
        'url': 'http://search.lovezxp.com/?type=article&text=',
        'suffix': ''
    },
    'github': {
        'name': 'GitHub',
        'url': 'http://github.com/search?q=',
        'suffix': ''
    }
};

// links
var pubLinks = {
    '购物': {
        '京东': {
            'url': 'http://www.jd.com/'
        },
        '天猫': {
            'url': 'http://www.tmall.com/'
        },
        '淘宝': {
            'url': 'http://www.taobao.com/'
        },
        '亚马逊': {
            'url': 'http://www.amazon.cn/'
        },
        '一号店': {
            'url': 'http://www.yhd.com/'
        },
        '当当': {
            'url': 'http://www.dangdang.com/'
        },
        '网易严选': {
            'url': 'http://you.163.com/'
        }
    },
    '工具': {
        '12306': {
            'url': 'http://www.12306.cn/'
        },
        '百度地图': {
            'url': 'http://map.baidu.com/'
        },
        '大众点评': {
            'url': 'http://www.dianping.com/beijing'
        },
        'QQ邮箱': {
            'url': 'http://mail.qq.com/'
        },
        '网易邮箱': {
            'url': 'http://email.163.com/'
        },
        'Gmail': {
            'url': 'http://mail.google.com'
        },
        '有道翻译': {
            'url': 'http://fanyi.youdao.com/'
        },
        '快递查询': {
            'url': 'http://www.kuaidi100.com/'
        }
    },
    '社交': {
        '微博': {
            'url': 'http://weibo.com/'
        },
        '微信网页版': {
            'url': 'http://wx.qq.com/'
        },
        '百度贴吧': {
            'url': 'http://tieba.baidu.com/'
        },
        '知乎': {
            'url': 'http://www.zhihu.com/'
        },
        'Quora': {
            'url': 'http://www.quora.com'
        },
        'Youtube': {
            'url': 'http://www.youtube.com/'
        },
        'Facebook': {
            'url': 'http://www.facebook.com/'
        },
        'Tumblr': {
            'url': 'http://www.tumblr.com/'
        },
        'Instagram': {
            'url': 'http://www.instagram.com'
        }
    },
    '学习': {
        'CSDN': {
            'url': 'http://www.csdn.net/'
        },
        'W3School': {
            'url': 'http://www.w3school.com.cn/'
        },
        'Stack Overflow': {
            'url': 'http://stackoverflow.com/'
        },
        'GitHub': {
            'url': 'http://github.com/'
        },
        'V2EX': {
            'url': 'http://www.v2ex.com/'
        },
        'SegmentFault': {
            'url': 'http://segmentfault.com/'
        },
        '掘金': {
            'url': 'http://gold.xitu.io/'
        },
        '网易公开课': {
            'url': 'http://open.163.com/'
        }
    },
    '求职': {
        'LinkedIn': {
            'url': 'http://www.linkedin.com/'
        },
        '大街网': {
            'url': 'http://www.dajie.com/'
        },
        '拉勾网': {
            'url': 'http://www.lagou.com/'
        },
        '智联招聘': {
            'url': 'http://zhaopin.com/'
        },
        '前程无忧': {
            'url': 'http://www.51job.com/'
        },
        '应届生': {
            'url': 'http://www.yingjiesheng.com/'
        }
    },
    '娱乐': {
        '优酷': {
            'url': 'http://www.youku.com/'
        },
        '土豆': {
            'url': 'http://www.tudou.com/'
        },
        '爱奇艺': {
            'url': 'http://www.iqiyi.com/'
        },
        '芒果TV': {
            'url': 'http://www.mgtv.com/'
        },
        '哔哩哔哩': {
            'url': 'http://www.bilibili.com/'
        },
        'AcFun': {
            'url': 'http://www.acfun.tv/'
        },
        '吐槽': {
            'url': 'http://www.tucao.tv/'
        },
        '热歌榜': {
            'url': 'http://music.163.com/#/playlist?id=3778678'
        }
    }
};

var byrLinks = {
    '北邮校园': {
        '北邮官网': {
            'url': 'http://www.bupt.edu.cn/'
        },
        '官方导航': {
            'url': 'http://dep.bupt.edu.cn/dh/'
        },
        '本科教务系统': {
            'url': 'http://jwxt.bupt.edu.cn/'
        },
        '研究生教务系统': {
            'url': 'http://yjxt.bupt.edu.cn/'
        },
        '教务处': {
            'url': 'http://jwc.bupt.edu.cn/'
        },
        '北邮人论坛': {
            'url': 'http://bbs.byr.cn/'
        },
        '北邮人BT': {
            'url': 'http://bt.byr.cn/'
        },
        '北邮IPTV': {
            'url': 'http://tv.byr.cn/'
        },
        '信息门户': {
            'url': 'http://my.bupt.edu.cn/'
        },
        '图书馆': {
            'url': 'http://lib.bupt.edu.cn/'
        },
        '北邮贴吧': {
            'url': 'http://tieba.baidu.com/f?kw=%B1%B1%BE%A9%D3%CA%B5%E7%B4%F3%D1%A7'
        },
        '校园网': {
            'url': 'http://nic.bupt.edu.cn/'
        },
        '北邮邮箱': {
            'url': 'http://mail.bupt.edu.cn/'
        },
        'VPN服务': {
            'url': 'http://nic.bupt.edu.cn/list/list.php?p=3_24_1'
        },
        '空闲自习室查询': {
            'url': 'http://buptclass.com/'
        }
    },
    '论坛相关': {
        '北邮人论坛': {
            'url': 'http://bbs.byr.cn/#!default'
        },
        '游客版论坛': {
            'url': 'http://bbs.cloud.icybee.cn'
        },
        '检索用户回复': {
            'url': 'http://search.icybee.cn/'
        },
        '检索用户发帖': {
            'url': 'http://search.lovezxp.com/'
        },
        '查看每日十大': {
            'url': 'http://bbss.zhengzi.me/'
        },
        '查看论坛数据': {
            'url': 'http://bbs.byr.cn/#!elite/path?v=/bbslists'
        },
        'APP下载（安卓）': {
            'url': 'http://android.myapp.com/myapp/detail.htm?apkName=cn.byr.bbs.app'
        },
        'APP下载（苹果）': {
            'url': 'http://itunes.apple.com/cn/app/bei-you-ren-lun-tan-bei-you/id1115232927?mt=8'
        },
        '论坛官方微博': {
            'url': 'http://weibo.com/byrbbs'
        },
        '论坛投票区': {
            'url': 'http://bbs.byr.cn/#!vote'
        },
        '玩转论坛指南': {
            'url': 'http://bbs.byr.cn/#!article/Talking/5852307'
        }
    },
    '其他': {
        '空余教室查询': {
            'url': 'http://jwc.bupt.edu.cn/content/content.php?p=10_2_235'
        },
        '辅修专业': {
            'url': 'http://jwc.bupt.edu.cn/list/list.php?p=7_50_1'
        },
        '毕业设计': {
            'url': 'http://jwc.bupt.edu.cn/list/list.php?p=9_38_1'
        },
        '学生校际选修': {
            'url': 'http://www.xueyuanlu.cn/'
        },
        '创新学分': {
            'url': 'http://jwc.bupt.edu.cn/list/list.php?p=9_39_1'
        },
        '课表查询': {
            'url': 'http://jwc.bupt.edu.cn/list/list.php?p=4_34_1'
        },
        '考表查询': {
            'url': 'http://jwc.bupt.edu.cn/list/list.php?p=4_35_1'
        },
        '出国成绩单办理': {
            'url': 'http://jwc.bupt.edu.cn/content/content.php?p=5_27_65'
        },
        '教学事务流程': {
            'url': 'http://jwc.bupt.edu.cn/content/content.php?p=5_68_111'
        },
        '创新实践平台': {
            'url': 'http://cslab.bupt.edu.cn/innovation/'
        },
        '申请护照通行证': {
            'url': 'http://xsc.bupt.edu.cn/content/content.php?p=27_26_48'
        },
        '补办学生证': {
            'url': 'http://xsc.bupt.edu.cn/content/content.php?p=27_26_48'
        },
        '校园一卡通': {
            'url': 'http://ecard.bupt.edu.cn/'
        },
        '办公电话': {
            'url': 'http://www.bupt.edu.cn/content/content.php?p=6_9_79'
        },
        '校历': {
            'url': 'http://www.bupt.edu.cn/content/content.php?p=6_10_80'
        }
    }
}
