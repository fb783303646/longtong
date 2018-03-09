// 手机号验证
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
}

// 密码验证
export function isPassword(str) {
    const reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g
    return reg.test(str)
}

// 身份证正则验证
export function isCard(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
}