// ==UserScript==
// @name         天眼查企业信息复制脚本
// @namespace    http://tampermonkey.net/
// @version      v1.0.2
// @description  天眼查企业信息复制脚本
// @author       Coding_Panda
// @match        https://www.tianyancha.com/company/*
// @icon         https://www.google.com/s2/favicons?domain=tianyancha.com
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/cnchar/cnchar.min.js
// ==/UserScript==
(function() {
    function copyToClip(contentArray, message) {
        var contents = "";
        for (var i = 0; i < contentArray.length; i++) {
            contents += contentArray[i] + "\n";
        }
        const textarea = document.createElement('textarea');
        textarea.value = contents;
        document.body.appendChild(textarea);
        textarea.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        document.body.removeChild(textarea);
        if (message == null) {
            alert("复制成功");
        } else{
            alert(message);
        }
    }
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    // test.js
    // if (pinyin.isSupported()) {
    //     pinyin.convertToPinyin('我'); // WO
    // }
    // let script = document.createElement('script');
    // script.setAttribute('type', 'text/javascript');
    // script.src = "https://cdn.jsdelivr.net/npm/cnchar/cnchar.min.js";
    // document.documentElement.appendChild(script);
    console.log('汉字'.spell());
    '汉字'.stroke();

    var HeaderDiv = document.getElementsByClassName("header")[0];
    var copyButton = document.createElement("button");
    copyButton.innerText = "点我复制公司所有信息";
    copyButton.style.background = "#6699ff";
    copyButton.style.color = "#fff";
    copyButton.style.width = "100px";
    copyButton.style.height = "30px";
    copyButton.onclick = function () {
        console.log("start!");
        //法人
        var LegalEntity = document.getElementsByClassName("in-block sup-ie-company-header-child-1")[0].getElementsByClassName("link-click")[0].innerText;
        // 企业名称
        var LegalEntityPinyinRaw = LegalEntity.spell();
        var LegalEntityPinyinFormat1 = LegalEntityPinyinRaw.toLowerCase();
        var letterItems = LegalEntityPinyinRaw.split("");
        var Flag = 0;
        var index = 0;
        var LegalEntityPinyinFormat2 = '';
        for (var i = 0; i < letterItems.length; i++) {
            if (letterItems[i] <= 'Z' && letterItems[i] >= 'A') {
                Flag += 1;
                if (Flag == 2) {
                    index = i;
                    break;
                }
            }
            LegalEntityPinyinFormat2 += letterItems[i];
        }
        var str = "";
        for (var i = index; i < letterItems.length; i++) {
            str += letterItems[i];
        }
        LegalEntityPinyinFormat2 = str + ' ' + LegalEntityPinyinFormat2;
        var CropName = document.getElementsByClassName("name info-need-copy _title")[0].innerText;
        // test = document.getElementsByClassName("copy-info-box")[0].innerText;
        var CropNamePinyin = CropName.spell();
        CropNamePinyin = CropNamePinyin.toLowerCase();
        // 社会信用代码
        var CreditCode = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[15].innerText;
        // CreditCode = document.getElementsByClassName("info-need-copy _creditcode")[0].innerHTML;
        // 注册地址
        var Addr = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[41].innerText;
        Addr = Addr.split("附近公司")[0];
        var AddrPinyin = Addr.spell();
        AddrPinyin = AddrPinyin.toLowerCase();
        //Addr = document.getElementsByClassName("info-need-copy _zhuceaddr")[0].innerHTML; // 地址
        // 企业类型
        var CropType = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[27].innerText;
        // 经营状态
        var Condition = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[3].innerText;
        // 成立日期
        var CreateTime = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[7].innerText;
        // 核准日期
        var VerifyTime = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[25].innerText
        // 经营范围
        var BusinessRange = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[43].innerText;
        // 营业期限
        var BusinessTerm = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[21].innerText;
        // 登记机关
        var RegisterOrg = document.getElementsByClassName("table -striped-col -breakall")[0].getElementsByTagName("td")[35].innerText;

        // console.log(LegalEntity + CropName + CreditCode +
        // Addr + Condition + CreateTime +
        // VerifyTime + BusinessTerm + BusinessRange + RegisterOrg);
        var FinalStr = '公司名称: ' + CropName + '\n'
                    + '公司名称全拼: ' + CropNamePinyin + '\n'
                    +  '法人姓名: ' + LegalEntity + '\n'
                    +  '法人姓名全拼格式1: ' + LegalEntityPinyinFormat1 + '\n'
                    +  '法人姓名全拼格式2: ' + LegalEntityPinyinFormat2 + '\n'
                    +  '统一社会信用代码: ' + CreditCode + '\n'
                    +  '注册地址: ' + Addr + '\n';
                    // +  '企业类型: ' + CropName + '\n'
                    // +  '经营状态: ' + Condition + '\n'
                    // +  '成立日期: ' + CreateTime + '\n'
                    // +  '核准日期: ' + VerifyTime + '\n'
                    // +  '经营范围: ' + BusinessRange + '\n'
                    // +  '营业期限: ' + BusinessTerm + '\n'
                    // +  '登记机关: ' + RegisterOrg;

        //omit 企业类型  经营状态 成立日期 核准日期 经营范围 营业期限 登记机关
        var FinalStrList = [
        '公司名称: ' + CropName, '公司名称全拼: ' + CropNamePinyin,
        '法人姓名: ' + LegalEntity, '法人姓名全拼格式1: ' + LegalEntityPinyinFormat1,
        '法人姓名全拼格式2: ' + LegalEntityPinyinFormat2,
        '统一社会信用代码: ' + CreditCode, '注册地址: ' + Addr,
        '注册地址全拼: ' + AddrPinyin];
        // '企业类型: ' + CropName, '经营状态: ' + Condition,
        // '成立日期: ' + CreateTime, '核准日期: ' + VerifyTime,
        // '经营范围: ' + BusinessRange,
        // '营业期限: ' + BusinessTerm, '登记机关: ' + RegisterOrg];
        console.log(FinalStr);
        copyToClip(FinalStrList, "企业信息复制成功");
    }
    HeaderDiv.appendChild(copyButton);

})();
