module.exports = {
    types : {
        qq : {
            is  : ['122192','1501751476','2060293288','3033673341','15484'],
            not : ['100','2554','+zu232','validator','mg2018','+wv8723i','','@736wu32']
        },
        zh : {
            is  : ['数据校验','全中文校验'],
            not : ['2018校验','！@#￥%……&*（,.。:;\'\"字符','英文mgvalidator']
        },
        en : {
            is  : ['validator','mgvalidator'],
            not : ['数字2018shuzi','符号！@#￥%……&*（），。内容的1322','英文validator']
        },
        number : {
            is  : ['2018','1234567890','0123456789'],
            not : ['0.023','-2038.00','+12093','00.29382','251,120,322','符号！@#￥%……&*（），。内容的1322','英文validator']
        },
        positive : {
            is  : ['2930','100','0.01','20.30','+100'],
            not : ['-100','mg2018','+wv8723i','','@736wu32']
        },
        negative : {
            is  : ['-203','-0.01','-20.30','-1'],
            not : ['2930','100','0.01','20.30','+100','+wv8723i','','@736wu32']
        },
        int : {
            is  : ['100','200','2018','-203','+2039'],
            not : ['0.01','20.30','+w032','251,120,322']
        },
        numeric : {
            is : ['100','0.01','+200','+20.03','-100','-20.03','+0.003','-0.003'],
            not : ['251,120,322','@736wu32','+wv8723i']
        },
        email : {
            is : ['mgteam@qq.com', 'foo+bar@bar.com'],
            not : ['invalidemail@', 'somename@ｇｍａｉｌ.com', 'test1@invalid.co m', 'z@co.c']
        },
        lowercase : {
            is : ['adgsd', 'hrtg', 'a#$&%', '3346aa'],
            not : ['AD', '345D', 'ASDgerg', 'defhrtD', 'A#$&%']
        },
        uppercase : {
            is : ['AHEDGJ', 'R', '54DD', '$%^FF'],
            not : ['sdf', 'ASDGr', '43dd5', '$f^%']
        },
        url : {
            is : ['foobar.com', 'www.foobar.com', 'foobar.com/', 'http://www.foobar.com/', 'https://www.foobar.com/', 'http://189.123.14.13/', 'ftp://www.foobar.com/', 'http://foobar.com/?foo=bar#baz=qux'],
            not : ['xyz://foobar.com', 'http://com/', 'http://\n@www.foobar.com/', 'https://example.com/foo/<script>alert(\'XSS\')</script>/']
        },
        json : {
            is : ['{ "key": "value" }', '{}'],
            not : ['{ key: "value" }', 'null', '1234', 'false', '"nope"', 354]
        },
        mobilephonezhcn : {
            is : ['15323456787', '13523333233', '13898728332', '+086-13238234822', '08613487234567', '+086-16637108167', '16637108167', '86-17823492338'],
            not : ['12345', '', 'Vml2YW11cyBmZXJtZtesting123', '010-38238383']
        },
        unix_timestamp : {
            is : ['1520221482'],
            not : ['1520221481509']
        },
        timestamp : {
            is : ['1520221481509'],
            not : ['5', 123456, [], {}, true, null, new Date(), function(){}, undefined, NaN, '1520221482']
        },
        host : {
            is : ['domain.tld'],
            not : ['.none']
        },
        ip : {
            is : ['127.0.0.1', '::1', 'fe80::a6db:30ff:fe98:e946', '::ffff:127.0.0.1'],
            not : ['abc', '0.0.0.256', '200.200.200.0200', '11111:1:1:1:1:1:1:1', '0:0:0:0:0:0:ffff:127.0.0.1']
        },
        ipv4 : {
            is : ['172.17.0.111'],
            not : ['256.512.1024.2048']
        },
        ipv6 : {
            is : ['2001:0db8:0000:85a3:0000:0000:ac1f:8001'],
            not : ['cow:beef:surprise:meurk:0000:0000:ac1f:sausage']
        },
        base64 : {
            is : ['Zg==',
                'Zm8=',
                'Zm9v',
                'Zm9vYg==',
                'Zm9vYmE=',
                'Zm9vYmFy',
                'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
                'Vml2YW11cyBmZXJtZW50dW0gc2VtcGVyIHBvcnRhLg==',
                'U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==',
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuMPNS1Ufof9EW/M98FNw' +
                'UAKrwflsqVxaxQjBQnHQmiI7Vac40t8x7pIb8gLGV6wL7sBTJiPovJ0V7y7oc0Ye' +
                'rhKh0Rm4skP2z/jHwwZICgGzBvA0rH8xlhUiTvcwDCJ0kc+fh35hNt8srZQM4619' +
                'FTgB66Xmp4EtVyhpQV+t02g6NzK72oZI0vnAvqhpkxLeLiMCyrI416wHm5Tkukhx' +
                'QmcL2a6hNOyu0ixX/x2kSFXApEnVrJ+/IxGyfyw8kf4N2IZpW5nEP847lpfj0SZZ' +
                'Fwrd1mnfnDbYohX2zRptLy2ZUn06Qo9pkG5ntvFEPo9bfZeULtjYzIl6K8gJ2uGZ' +
                'HQIDAQAB'],
            not : ['12345',
                '',
                'Vml2YW11cyBmZXJtZtesting123',
                'Zg=',
                'Z===',
                'Zm=8',
                '=m9vYg==',
                'Zm9vYmFy====']
        },
        legal_input : {
            is : ['sgffg', '2346', '(asf)'],
            not : ['<afgf', '{}', '345+345']
        }
    },
    length : {
        len1 : {
            is : ['djthrh', 'kkkkkk76', '中文五个字', '12345678', '%$^&@$', 'flj98^&'],
            not : ['12', '', '1']
        },
        len2 : {
            is : ['djthrh', 'kkkkkk76', '中文五个字', '12345678', '%$^&@$', 'flj98^&', ''],
            not : ['1234567890', 'cvbgfrt6780']
        },
        len3 : {
            is : ['djthrh', 'kkkkkk76', '中文五个字', '12345678'],
            not : ['12', 'cvbg', '1111', '']
        },
        len4 : {
            is : ['djthrh', 'kkkkkk76', '中文五个字', '123456789', '%$^&@$', 'flj98^&', ''],
            not : ['1234567890']
        },
        len5 : {
            is : ['djthrh'],
            not : ['12', 'cvbgfrt6780', '1111', '999000/7*(', '8', '09','']
        },
        len6 : {
            is : ['djthrh', 'kkkkkk76', '中文五个字', '12345678', '%$^&@$', 'flj98^&'],
            not : ['999000/7*(345', '8', '09', '']
        }
    },
    compare : {
        is : [
            {data1 : '12345', data2 : '1234', data3 : '1234', data4 : '12'}
        ],
        not : [
            {data1 : '123', data2 : '1234', data3 : '1111', data4 : '12345'}
        ]
    },
    extend : {
        is : [
            {name : 'ext1', rule : /^\d{5,10}$/},
            {name : 'ext2', rule : function(val){return /^\d{5,10}$/.test(val);}}
        ],
        not : [
            {name : 'and', rule : /^\d{5,10}$/},
            {name : 'or', rule : function(val){return /^\d{5,10}$/.test(val);}},
            {name : 'not', rule : /^\d{5,10}$/},
            {name : 'datetime', rule : /^\d{5,10}$/},
            {name : 'ext3', rule : '>1234'},
            {name : 'ext4', rule : null},
            {name : 'ext5', rule : undefined}
        ]
    },
    merge : {
        is : ['1234567', 'sgdfhtr', '255.255.255.0', '13391230324', 'SDGE', '52457654@qq.com', '{"name":"zhang"}', '中文'],
        not : ['11', 'sfgagf4fg', '255.256.255.0', '11391230324', 'gadf', '52457654@qq', '{name:"zhang"}', 'fad']
    },
    datetime : {
        is : ['2011/12/12 05:05:05', '2012-02-28 00.00.00', '2011|12|12 23.59.59', '2011.12.12 23:59:59', '2011/01/04', '2011-05-31', '2011.06.30', '2400/02/29', '2000/02/29 05:05:05', '2011-12-12'],
        not : ['2011/2/12 05:05:05', '2011-02-29 05.05.05', '2018|12|12 24.12.12', '2012.02.29 23:60:05', '2011/00/00', '2011-05-32', '2011.06.31', '2002/02/29', '2000/02/29 05:05', 'sddd-12-12']
    },
    optional : {
        is : {data : 'sfsfsd'},
        not : {data : '2565'}
    }
}
