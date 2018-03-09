export default {

    // create_xxx   //创建 新增
    // remove_xxx   // 删除 
    // edit_xxx     // 编辑
    // get_xxx      // 获取
    
    // 商品列表api
    productUrl: '/product/list',                          // 产品列表
    regionUrl: '/region/list',                            // 获取所有地区信息
    get_industry:'/industry/list',                        // 获取行业信息

    // 用户api
    distributionUrl: '/member/distribution/list',          // 获取分销用户列表信息
    DisReverseUrl: '/member/distribution/reverse',         // 禁用/启用用户
    createDisributionUrl: '/member/distribution/add',      // 添加用户
    remove_disribution: '/member/distribution/del',        // 删除用户
    get_single_disribution: '/member/distribution/',       // 获取单个信息

    supplyUrl: '/member/supply/list',                      // 分页查询供应商用户
    remove_supply: '/member/supply/del',                   // 分页查询供应商用户
    supplyReverseUrl: '/member/supply/reverse',            // 禁用/启用
    create_supply: '/member/supply/add',                   // 新增供应商用户

    // 统计类
    groupCountUrl: '/member/group-count',                  //  统计各类用户
}