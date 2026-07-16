// ===== 李新春 个人面试Agent 主逻辑 =====
let currentSection = 'welcome';

function $(id) { return document.getElementById(id); }
function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) { if (k === 'className') e.className = v; else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v); else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v); else e.setAttribute(k, v); }
  for (const c of children) { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); }
  return e;
}

function navigateTo(section) {
  currentSection = section;
  document.querySelectorAll('.menu-item').forEach(m => m.classList.toggle('active', m.dataset.section === section));
  const names = { welcome:'🏠 首页', personal:'👤 个人信息', skills:'🛠️ 技术能力', management:'👥 管理经验', career:'🏢 企业经历', 'project-donglu':'⭐ 东陆AI平台', 'donglu-employees':'👥 13数字员工·26智能体', 'donglu-indicators':'📊 30个指标集', 'donglu-agent-finance':'💰 财务助理', 'donglu-agent-quote':'📊 报价员', 'donglu-agent-sales':'🤝 销售助理', 'donglu-agent-prod':'🏭 生产助理', 'donglu-agent-process':'🔧 工艺助理', 'donglu-agent-quality':'✅ 质检员', 'donglu-agent-planner':'📋 计划员', 'donglu-agent-warehouse':'📦 仓管员', 'donglu-agent-rd':'🔬 研发助理', 'donglu-agent-req':'📝 需求分析师', 'donglu-agent-procure':'🛒 采购员', 'donglu-agent-pm':'📈 项目经理', 'donglu-agent-exec':'👔 总裁办秘书', 'project-gansu':'⛏️ 甘肃稀土', 'project-city':'🏙️ 城市试点×成熟度', projects:'📁 其他项目' };
  $('breadcrumb').textContent = names[section] || section;
  // Close mobile menu
  $('sidebar').classList.remove('open');
  // Auto-open donglu submenu if navigating to a donglu sub-section
  if (section.startsWith('donglu-')) {
    openDongluSubmenu();
  }
  renderContent(section);
}

function toggleMobileMenu() { $('sidebar').classList.toggle('open'); }

function toggleDongluMenu() {
  const sub = document.getElementById('dongluSubmenu');
  const arrow = document.getElementById('dongluArrow');
  const isOpen = sub.style.maxHeight !== '0px';
  if (isOpen) {
    sub.style.maxHeight = '0px';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    sub.style.maxHeight = sub.scrollHeight + 'px';
    arrow.style.transform = 'rotate(180deg)';
    // Also navigate to donglu overview
    navigateTo('project-donglu');
  }
}

// Auto-open donglu submenu when navigating to any donglu sub-section
function openDongluSubmenu() {
  const sub = document.getElementById('dongluSubmenu');
  const arrow = document.getElementById('dongluArrow');
  if (sub && sub.style.maxHeight === '0px') {
    sub.style.maxHeight = sub.scrollHeight + 'px';
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
}

function renderContent(section) {
  const c = $('content'); c.className = 'fade-in';
  const render = { welcome: renderWelcome, personal: renderPersonal, skills: renderSkills, management: renderManagement, career: renderCareer, 'project-donglu': renderProjectDonglu, 'donglu-employees': renderDongluEmployees, 'donglu-indicators': renderDongluIndicators, 'donglu-agent-finance': ()=>renderDongluAgent('finance'), 'donglu-agent-quote': ()=>renderDongluAgent('quote'), 'donglu-agent-sales': ()=>renderDongluAgent('sales'), 'donglu-agent-prod': ()=>renderDongluAgent('prod'), 'donglu-agent-process': ()=>renderDongluAgent('process'), 'donglu-agent-quality': ()=>renderDongluAgent('quality'), 'donglu-agent-planner': ()=>renderDongluAgent('planner'), 'donglu-agent-warehouse': ()=>renderDongluAgent('warehouse'), 'donglu-agent-rd': ()=>renderDongluAgent('rd'), 'donglu-agent-req': ()=>renderDongluAgent('req'), 'donglu-agent-procure': ()=>renderDongluAgent('procure'), 'donglu-agent-pm': ()=>renderDongluAgent('pm'), 'donglu-agent-exec': ()=>renderDongluAgent('exec'), 'project-gansu': renderProjectGansu, 'project-city': renderProjectCity, projects: renderProjects };
  c.innerHTML = '';
  (render[section] || renderWelcome)();
}

// ===== Welcome =====
function renderWelcome() {
  const c = $('content');
  c.innerHTML = `
    <div class="card welcome-card fade-in">
      <div class="big-avatar">李</div>
      <h1>李新春</h1>
      <div class="subtitle">售前总监 / 资深售前顾问 · AI解决方案架构师</div>
      <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-bottom:24px;font-size:13px;color:var(--text2)">
        <span>📞 13243872871</span><span>📧 1020577381@qq.com</span><span>🎂 41岁 · 党员</span><span>🎓 川农 · 计算机</span>
      </div>
      <div class="quick-links">
        <a class="quick-link" onclick="navigateTo('personal')">👤 个人信息</a>
        <a class="quick-link" onclick="navigateTo('skills')">🛠️ 技能</a>
        <a class="quick-link" onclick="navigateTo('management')">👥 管理经验</a>
        <a class="quick-link" onclick="navigateTo('career')">🏢 企业经历</a>
        <a class="quick-link" onclick="navigateTo('project-donglu')">⭐ 东陆AI平台</a>
        <a class="quick-link" onclick="navigateTo('project-city')">🏙️ 试点×成熟度</a>
      </div>
      <div style="margin-top:24px;padding:16px;background:var(--primary-light);border-radius:8px;text-align:left">
        <div style="font-size:13px;font-weight:600;color:var(--primary);margin-bottom:8px">🤖 面试助手</div>
        <div style="font-size:13px;color:var(--text);line-height:1.6">你好，我是李新春的数字面试助手！欢迎浏览我的个人简历。点击上方菜单或左侧导航查看详细信息。</div>
      </div>
    </div>
  `;
}

// ===== 个人信息 =====
function renderPersonal() {
  const c = $('content'); const d = RESUME_DATA;
  c.innerHTML = `
    <div class="section-header fade-in"><h1>👤 个人信息</h1><p>个人基本信息与核心优势</p></div>
    <div class="card fade-in">
      <div class="contact-grid">
        ${[['📞','电话',d.basic.phone],['📧','邮箱',d.basic.email],['🎂','年龄',d.basic.age],['🎓','学历',d.basic.education],['🏢','公司',d.basic.company],['🎯','求职',d.basic.target],['📅','经验',d.basic.experience],['📍','城市',d.basic.city]].map(([icon,label,val])=>`
          <div class="contact-item"><span class="ci-icon">${icon}</span><div><div class="ci-label">${label}</div><div class="ci-value">${val}</div></div></div>
        `).join('')}
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">🏆 个人优势（技术与管理）</div>
      ${d.advantages.map(a => `
        <div class="adv-item"><span class="adv-icon">${a.icon}</span><span class="adv-text">${a.text}</span></div>
      `).join('')}
    </div>
  `;
}

// ===== 技术能力 =====
function renderSkills() {
  const c = $('content'); const d = RESUME_DATA;
  c.innerHTML = `
    <div class="section-header fade-in"><h1>🛠️ 技术能力</h1><p>售前咨询 · AI智能制造 · 系统架构 · 技术背景 · 行业认知</p></div>
    <div class="grid-5 fade-in">
      ${d.skills.map(s => `
        <div class="skill-card"><h3 style="color:${s.color}">${s.name}</h3><ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul></div>
      `).join('')}
    </div>
    <div class="card fade-in" style="margin-top:16px">
      <div class="card-title">🏷️ 核心技能标签</div>
      <div class="skill-tags">${d.skillTags.map(t => `<span class="skill-tag">#${t}</span>`).join('')}</div>
    </div>
  `;
}

// ===== 管理经验 =====
function renderManagement() {
  const c = $('content'); const d = RESUME_DATA;
  c.innerHTML = `
    <div class="section-header fade-in"><h1>👥 管理经验</h1><p>售前团队管理 & 项目全链路管控（针对售前总监岗位）</p></div>
    ${d.management.map((m, i) => `
      <div class="card fade-in" style="border-left:4px solid ${m.color}">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
          <span style="width:28px;height:28px;border-radius:50%;background:${m.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700">${i+1}</span>
          <div><div style="font-size:15px;font-weight:600;color:${m.color}">${m.company}</div><div style="font-size:12px;color:var(--text2)">${m.role} · ${m.period}</div></div>
        </div>
        ${m.items.map(item => `<div style="padding:4px 0;font-size:13px;display:flex;gap:8px"><span style="color:${m.color}">▸</span>${item}</div>`).join('')}
      </div>
    `).join('')}
    <div class="card fade-in" style="background:var(--primary-light)">
      <div class="card-title" style="font-size:14px;color:var(--primary)">🏷️ 管理能力标签</div>
      <div class="quick-links-row">
        ${['团队管理','售前全流程管控','百万级项目0-1推进','跨部门资源协调','政府/企业多方对接','团队建设与梯队培养','投标全流程'].map(t => `<span class="quick-link" style="font-size:11px;padding:4px 12px">${t}</span>`).join('')}
      </div>
    </div>
  `;
}

// ===== 企业经历 =====
function renderCareer() {
  const c = $('content'); const d = RESUME_DATA;
  c.innerHTML = `
    <div class="section-header fade-in"><h1>🏢 企业经历</h1><p>17年职业发展路径：从华为开发到华制智能售前总监</p></div>
    <div class="card fade-in">
      <div class="timeline">
        ${d.career.map(c => `
          <div class="timeline-item" style="--dot:${c.color}">
            <div class="period">${c.period}</div>
            <div class="company" style="color:${c.color}">${c.company}</div>
            <div class="role">${c.role}</div>
            <div class="desc">${c.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ===== 东陆AI平台 =====
function renderProjectDonglu() {
  const c = $('content'); const p = RESUME_DATA.projects[0];
  c.innerHTML = `
    <div class="section-header fade-in"><h1>⭐ 东陆科技工业AI智能平台</h1><p>核心项目 · 首例全栈私有化工业AI标杆</p></div>
    <div class="project-card fade-in" style="border-left-color:${p.color}">
      <div class="header">
        <h2 style="color:${p.color}">${p.name}</h2>
        <div class="meta">${p.period} · ${p.role}</div>
      </div>
      <div style="margin-bottom:12px"><span class="highlight">${p.highlight}</span></div>
      <div class="quick-links-row">${p.tags.map(t => `<span class="tag tag-green">${t}</span>`).join('')}</div>
    </div>

    <div class="card fade-in">
      <div class="card-title">🏗️ 四层架构设计</div>
      ${p.architecture.map(a => `
        <div class="arch-item"><span class="arch-label" style="background:${a.color}">${a.layer}</span><span class="arch-desc">${a.desc}</span></div>
      `).join('')}
    </div>

    <div class="card fade-in">
      <div class="card-title">📅 里程碑规划</div>
      <div class="milestone-row">
        ${p.milestones.map(m => `
          <div class="milestone-item">
            <div class="milestone-dot" style="background:${m.color}"></div>
            <div class="name">${m.name}</div>
            <div class="period">${m.period}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-title">🏆 核心工作与成果</div>
      <div class="achievement-grid">
        ${p.achievements.map((a, i) => `
          <div class="achievement-item" style="border-left-color:${['#4472C4','#3D9F90','#E89C3C','#5BA0D0','#957FC8','#4472C4'][i]}">
            <div class="num" style="color:${['#4472C4','#3D9F90','#E89C3C','#5BA0D0','#957FC8','#4472C4'][i]}">0${i+1}</div>
            <div class="title">${a.split('，')[0]}</div>
            <div class="desc">${a}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-title">🖥️ 平台UI展示</div>
      <div class="ui-grid">
        ${p.uiFeatures.map(ui => `
          <div class="ui-card"><div class="ui-icon">${ui.title.split(' ')[0]}</div><div class="ui-title" style="color:${ui.color}">${ui.title.replace(/^[^\s]+\s/,'')}</div><div class="ui-desc">${ui.desc}</div></div>
        `).join('')}
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">🎥 项目演示视频</div>
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <div style="flex:1;min-width:200px">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px">📹 腾讯会议录制：东陆项目方案讲解</div>
          <div style="font-size:12px;color:var(--text2);margin-bottom:8px">录制人：李文彬 · 项目方案快速会议</div>
          <a href="https://meeting.tencent.com/crm/N81jXXzo00" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:500">
            ▶ 观看录制视频
          </a>
        </div>
        <div style="padding:12px 20px;background:var(--bg);border-radius:8px;text-align:center">
          <div style="font-size:32px;margin-bottom:4px">🎬</div>
          <div style="font-size:11px;color:var(--text2)">点击按钮查看<br>完整方案讲解</div>
        </div>
      </div>
    </div>
  `;
}

// ===== 13数字员工·26智能体 =====
const DONGULU_AGENTS = {
  finance:{name:'财务助理',dept:'财务部',color:'#4472C4',icon:'💰',agents:[
    {name:'客户对账单自动对比',desc:'步骤1. 系统定时触发/手动触发 → 自动调用4家银行API获取当日收款水单数据\n步骤2. 汇总水单数据以列表形式展示给财务人员查看确认\n步骤3. 根据水单中的付款方名称、金额等关键信息自动与ERP立账单进行模糊/精确匹配\n步骤4. 将匹配结果（已匹配/未匹配）展示给财务人员确认或手动调整\n步骤5. 确认无误后自动在ERP系统生成收款单\n步骤6. 生成对账简报（含匹配笔数/未匹配/异常说明）通过飞书推送财务人员',mcp:'mcp-bank-download-receipt|mcp-erp-get-receivable|mcp-erp-create-payment',plugins:'data-transform-plugin|matching-engine-plugin',tools:'bank-api-client|erp-api-client|feishu-notify',datasources:'  - 银行收款水单数据(4家银行API)\n  - ERP立账单数据(数据库视图)\n  - ERP客户主数据(数据库)\n  - 飞书消息推送API'},
    {name:'付款核对自动处理',desc:'步骤1. 财务人员手动触发智能体执行\n步骤2. 自动获取银行付款水单数据与票据数据\n步骤3. 整理后提交财务人员查看确认\n步骤4. 对票据数据自动在ERP创建对应"应付票据"\n步骤5. 获取ERP付款申请单，用水单/票据数据按金额/供应商名称进行匹配\n步骤6. 将匹配结果展示给财务人员（完全匹配/合并匹配/无法匹配）\n步骤7. 用户确认后自动生成付款单，提交任务简报',mcp:'mcp-bank-get-statement|mcp-erp-get-payment-request|mcp-erp-create-voucher',plugins:'matching-engine-plugin',tools:'bank-api-client|erp-api-client',datasources:'  - 银行付款水单数据(银企直连)\n  - 银行付款票据数据(银企直连)\n  - ERP付款申请单(数据库)'},
    {name:'老品成本自动核算',desc:'步骤1. 用户手动触发，输入产品品号（可多个）\n步骤2. 根据品号从ERP获取最新BOM\n步骤3. 查询BOM中所有物料对应的可用替换料\n步骤4. 获取所有物料与替换料的最新价格，寻找最低价并按最低价更新主物料\n步骤5. 按既定规则计算物料成本（未税价格）\n步骤6. 从辅助系统获取标准工时信息，计算SMT成本（按点位分类和阶梯价）\n步骤7. 计算DIP成本、组装段成本、运费成本\n步骤8. 汇总展示总成本和各项明细，支持与前一次成本核算结果对比',mcp:'mcp-erp-get-bom|mcp-erp-get-material-price|mcp-erp-get-quotation|mcp-aux-get-standard-time',plugins:'calculation-plugin|excel-export-plugin',tools:'bom-parser|price-optimizer|cost-calculator',datasources:'  - ERP BOM信息\n  - ERP物料替换件清单\n  - ERP报价表\n  - 辅助系统标准工时\n  - 辅助系统小时产能\n  - 点位单价阶梯价格表\n  - DIP标准工时经验值\n  - 运费标准单价'},
  ]},
  quote:{name:'报价员',dept:'财务部',color:'#3D9F90',icon:'📊',agents:[
    {name:'智能报价生成',desc:'步骤1. 研发人员手动触发报价需求，上传BOM清单Excel\n步骤2. 智能体解析Excel内容，识别物料品号与价格信息\n步骤3. 对有品号的物料自动查询最新价格，识别无价格/无品号物料\n步骤4. 对需要询价的物料校验规格信息完整性，识别是否需图纸\n步骤5. 整理询价需求发送给采购员，供应商在线填报回写报价\n步骤6. 按阶梯价规则自动计算SMT成本（电容/电阻/二极管等分类点位数×单价）\n步骤7. 计算DIP成本（标准工时经验值）、组装段成本、运费成本\n步骤8. 汇总生成完整报价单，含物料明细、各项成本和总价',mcp:'mcp-erp-get-bom|mcp-erp-get-material-price|mcp-erp-create-quotation',plugins:'document-parser-plugin|calculation-plugin|excel-export-plugin',tools:'excel-parser|material-classifier|cost-calculator',datasources:'  - ERP报价表\n  - 默认标准工时规则\n  - 电子料点位计算规则\n  - 点位单价阶梯价格表\n  - DIP标准工时经验值\n  - 运费标准单价\n  - 包装纸箱选型与用量计算规则'},
  ]},
  sales:{name:'销售助理',dept:'销售部',color:'#E89C3C',icon:'🤝',agents:[
    {name:'客户画像与分级',desc:'步骤1. 手动触发/自动触发，输入客户信息（可批量）\n步骤2. 判断新老客户：老客户走更新流程，新客户处理流程\n步骤3. 调取企查查等第三方API查询客户全称、公司规模、注册资金、法律纠纷等\n步骤4. 调取ERP数据计算年度销售额（1-12月开票金额）和准时回款率\n步骤5. 按规则计算客户信息与东陆业务匹配度\n步骤6. 按S/A/B/C四档规则自动匹配客户等级\n步骤7. 将画像结果和分级信息写入ERP与飞书客户管理',mcp:'mcp-third-party-company-info|mcp-erp-get-invoice|mcp-erp-get-customer|mcp-feishu-send-message',plugins:'data-visualization-plugin',tools:'company-info-fetcher|customer-grading-engine|data-aggregator',datasources:'  - 企查查第三方API\n  - ERP客户主数据\n  - ERP客户发票开票数据\n  - ERP客户立账单数据\n  - ERP客户收款单数据\n  - 飞书客户管理功能'},
    {name:'销售智能问答',desc:'步骤1. 管理员构建知识库体系，创建各类文件夹\n步骤2. 导入销售部知识文档（产品手册、报价政策、行业方案等）\n步骤3. 智能体对文档进行解析和向量化\n步骤4. 用户输入问题，智能体进行语义检索匹配相关知识\n步骤5. 结合知识库内容生成回答，支持内部员工和外部客户使用\n步骤6. 持续优化：根据用户反馈更新知识库内容',mcp:'无',plugins:'knowledge-base-plugin',tools:'document-parser|semantic-searcher|rag-engine',datasources:'  - 销售部知识文档(产品手册/报价政策/行业方案等)'},
    {name:'报价参数引导',desc:'步骤1. 销售员发起报价引导，智能体提供报价参数引导链接\n步骤2. 销售员将链接分享给客户，或自己打开链接填写\n步骤3. 客户按引导页面填写产品类型、规格要求、数量等信息\n步骤4. 智能体自动整理填写内容并进行完整性校验\n步骤5. 将整理后的结果通过消息通知反馈给销售、研发与报价人员\n步骤6. 各方查看填写结果，进入正式报价流程',mcp:'mcp-feishu-send-message',plugins:'notification-plugin|data-validation-plugin',tools:'form-generator|data-validator|link-sender',datasources:'  - 四大类产品报价参数引导配置\n  - 填写参数解释信息库'},
  ]},
  prod:{name:'生产助理',dept:'生产部',color:'#5BA0D0',icon:'🏭',agents:[
    {name:'软件版本变更提醒',desc:'步骤1. 每日自动触发，获取当天/明天的排产信息\n步骤2. 检查每条组装产线需要生产的产品品号\n步骤3. 根据产品品号查询BOM清单，查找软件信息\n步骤4. 通过软件信息在PLM中查询软件版本变更申请状态\n步骤5. 筛选出状态为"审核中"的变更申请\n步骤6. 整理每条产线有软件版本变更中的产品信息\n步骤7. 将结果推送给生产负责人，提示注意烧录版本',mcp:'mcp-erp-get-bom|mcp-plm-get-ecr-change',plugins:'notification-plugin|scheduler-plugin',tools:'schedule-fetcher|bom-software-extractor|plm-change-checker',datasources:'  - ERP BOM查询\n  - PLM软件版本变更申请单\n  - BOM中软件信息提取规则'},
    {name:'治具齐套检查',desc:'步骤1. 每日自动触发，获取当天/明天的排产信息\n步骤2. 根据产品品号查询薪福通中的治具采购申请单（近一个月）\n步骤3. 根据产品品号查询MES中的治具入库单\n步骤4. 比对治具采购申请单与入库单，判断是否全部到货\n步骤5. 已齐套：展示结果并通知PMC和生产负责人\n步骤6. 未齐套：展示结果并通知治具员跟进采购',mcp:'mcp-xft-query-tooling|mcp-mes-get-fixture',plugins:'notification-plugin|scheduler-plugin|readiness-calculator-plugin',tools:'schedule-fetcher|procurement-comparator',datasources:'  - 薪福通治具采购申请单\n  - MES治具入库单'},
  ]},
  process:{name:'工艺助理',dept:'工艺部',color:'#957FC8',icon:'🔧',agents:[
    {name:'异常处理知识沉淀',desc:'步骤1. 管理员构建工艺知识库体系，创建分类文件夹\n步骤2. 导入工艺部异常处理文档、生产管理经验文件\n步骤3. 智能体对文档进行解析和向量化存储\n步骤4. 生产或品质人员遇到异常时直接提问\n步骤5. 智能体基于知识库进行语义检索和匹配\n步骤6. 给出准确的异常处理方案和历史案例参考\n步骤7. 支持移动端使用，现场快速获取知识',mcp:'无',plugins:'knowledge-base-plugin|document-parser-plugin',tools:'document-parser|semantic-searcher|rag-engine',datasources:'  - 工艺部异常处理文档\n  - 生产管理经验文件'},
  ]},
  quality:{name:'质检员',dept:'品质部',color:'#43A993',icon:'✅',agents:[
    {name:'供应商质量评价',desc:'步骤1. 每月自动触发\n步骤2. 从SRM获取上一个月不合格批率TOP5供应商（检验批次/不合格批次/批率）\n步骤3. 从SRM获取上一个月不合格批数TOP5供应商\n步骤4. 从ERP获取物料退线率TOP10物料品号（发料数量/退不良品仓数量/退线率）\n步骤5. 从ERP获取供应商退线率TOP3供应商\n步骤6. 从SRM获取8D报告及闭环信息\n步骤7. 汇总所有数据，生成标准化供应商质量评价报告\n步骤8. 提交品质部人员审核处理',mcp:'mcp-srm-get-quality|mcp-erp-get-defect-rate',plugins:'excel-export-plugin|data-visualization-plugin|scheduler-plugin',tools:'quality-data-aggregator|report-generator',datasources:'  - SRM检验批次信息\n  - SRM供应商改善报告\n  - SRM 8D报告\n  - ERP发货信息\n  - ERP不良批次退料单'},
  ]},
  planner:{name:'计划员',dept:'物控部',color:'#3D9F90',icon:'📋',agents:[
    {name:'智能排产',desc:'步骤1. 用户界面触发"执行排产"\n步骤2. 获取所有未排产工单\n步骤3. 对工单逐个执行交期预测（客户交期→生产完成→生产开始→齐套要求）\n步骤4. 按交期预测结果生成预排产规划单（初始化状态）\n步骤5. 对所有预排产规划单排序，按先后逐个执行"正常排产"优化重排\n步骤6. 状态变为"未锁定"，PMC在界面中调整各工站时间、拆单、锁定\n步骤7. PMC确认后转化为正式排产单，实时同步给相关部门',mcp:'mcp-erp-get-work-order|mcp-erp-get-material-stock|mcp-mes-production-line',plugins:'scheduling-engine-plugin|calculation-plugin|data-visualization-plugin',tools:'due-date-predictor|production-scheduler|constraint-optimizer',datasources:'  - ERP工单/库存/BOM\n  - 客户交期Excel表\n  - 标准工时\n  - 产线信息\n  - 换产时间矩阵\n  - 工站衔接阈值\n  - 排班/加班/休息时间\n  - 最小生产计时单位'},
    {name:'齐套欠料追踪',desc:'步骤1. 用户界面触发查看生产物料齐套情况\n步骤2. 进入"生产物料齐套日历"插件\n步骤3. 根据操作时间确定齐套查询起止时间\n步骤4. 获取该时间段内所有排产单/预排产规划单\n步骤5. 对排产单按天拆分每个工站的生产任务\n步骤6. 对每个物料计算齐套状态（已齐套/未齐套有在途/未齐套需采购）\n步骤7. 标记齐备与不齐状态，展示不齐物料的采购在途信息\n步骤8. 支持一键生成领料申请单',mcp:'mcp-erp-get-work-order|mcp-erp-get-material-stock|mcp-erp-get-purchase-order',plugins:'readiness-calculator-plugin|data-visualization-plugin|scheduler-plugin',tools:'readiness-calendar|material-requirement-calc',datasources:'  - ERP工单\n  - ERP请购单\n  - ERP采购单\n  - ERP物料库存\n  - ERP BOM\n  - ERP领料申请单\n  - SRM采购单'},
    {name:'物料需求生成',desc:'步骤1. 用户发起物料需求请购处理，输入厂区\n步骤2. 从ERP查询未分析的销售订单和预测订单\n步骤3. 拆分行数据，提取产品品号\n步骤4. 用产品品号从PLM查询BOM变更状态，有变更则提醒用户\n步骤5. 组装数据并展示给用户确认（含BOM提醒信息）\n步骤6. 用户选择继续处理的订单行数据，调整生产厂区并确认\n步骤7. 调用"交期预测"插件完成交期预测\n步骤8. 根据成品生产量微调和物料采购需求微调规则，生成工单与请购单草稿',mcp:'mcp-erp-get-sales-order|mcp-erp-get-bom|mcp-erp-get-material-stock|mcp-plm-get-ecr-change',plugins:'calculation-plugin',tools:'order-analyzer|inventory-checker|requirement-generator',datasources:'  - ERP销售订单/预测订单\n  - ERP BOM/库存\n  - ERP替换件清单\n  - PLM BOM变更申请单\n  - 成品生产量微调规则\n  - 物料采购需求微调规则'},
    {name:'插单需求评估',desc:'步骤1. PMC发起插单评估，输入品号、交期要求、数量\n步骤2. 生成"插单评估任务"，进入评估插件\n步骤3. 根据品号从ERP查询BOM，计算所有物料的生产需求用量\n步骤4. 计算BOM中所有物料的齐套状态（锁定S/A级客户排产物料后计算）\n步骤5. 整理齐套信息：已齐套/未齐套有在途/未齐套需新增采购\n步骤6. 用户查看齐套信息，对不齐物料一键转采购员催货或询价\n步骤7. 汇总供应商到货日期后计算最早交期\n步骤8. 识别受影响的排产单，汇总信息提交PMC和市场部沟通',mcp:'mcp-erp-get-bom|mcp-erp-get-material-stock|mcp-erp-get-purchase-order|mcp-srm-get-delivery-info',plugins:'readiness-calculator-plugin|calculation-plugin',tools:'rush-order-evaluator|impact-analyzer',datasources:'  - ERP采购单\n  - ERP物料库存\n  - ERP BOM\n  - ERP客户主数据\n  - SRM采购单交期信息'},
  ]},
  warehouse:{name:'仓管员',dept:'物控部',color:'#4472C4',icon:'📦',agents:[
    {name:'到货质检同步',desc:'步骤1. 每日自动触发\n步骤2. 获取ERP中的到货单信息（物料品号/数量/供应商/检验状态/入库状态）\n步骤3. 从到货单逐级匹配到排产单/预排产规划单\n步骤4. 获取排产单的后续任务生产开始时间\n步骤5. 对所有到货单按生产紧急度进行优先级排序\n步骤6. 生成到货质检看板（分IQC/仓库/PMC/生产四个视角）\n步骤7. 实时同步质检进度给各环节相关人员\n步骤8. 到货完成后自动通知PMC和生产部门',mcp:'mcp-erp-get-arrival-note|mcp-erp-get-work-order|mcp-erp-get-customer',plugins:'data-visualization-plugin|notification-plugin|scheduler-plugin',tools:'priority-calculator|inspection-board-generator',datasources:'  - ERP到货单\n  - ERP客户主数据\n  - ERP工单'},
  ]},
  rd:{name:'研发助理',dept:'研发部',color:'#E89C3C',icon:'🔬',agents:[
    {name:'BOM版本变更提醒',desc:'步骤1. PMC在智能体平台执行物料请购/工单生成/排产/领料申请等操作\n步骤2. 智能体自动获取当前操作对象所包含的所有产品品号\n步骤3. 根据产品品号去PLM查询ECR变更申请单\n步骤4. 筛选状态：排除"通过""不通过""终止"等，保留审核中的变更\n步骤5. 整理变更信息：如有变更则提示"当前产品清单中存在BOM在变更中的品号"\n步骤6. 展示变更内容详情，点击可展开查看\n步骤7. PMC确认后决定是否等待变更完成后再执行操作',mcp:'mcp-plm-get-ecr-change',plugins:'notification-plugin',tools:'ecr-status-checker|product-number-extractor',datasources:'  - PLM ECR变更申请单'},
  ]},
  req:{name:'需求分析师',dept:'研发部',color:'#5BA0D0',icon:'📝',agents:[
    {name:'需求澄清引导',desc:'步骤1. 销售员发起需求澄清引导\n步骤2. 智能体提供一个需求澄清引导链接\n步骤3. 销售员将链接发给客户填写，或自己打开链接填写\n步骤4. 客户按引导页面填写产品需求详细信息（四类产品各自对应参数）\n步骤5. 智能体自动整理填写内容并进行完整性校验\n步骤6. 将整理后的结果通过消息通知反馈给销售和研发\n步骤7. 研发查看填写结果，进行技术可行性评审',mcp:'mcp-feishu-send-message',plugins:'notification-plugin|data-validation-plugin',tools:'form-generator|data-validator|link-sender',datasources:'  - 四大类产品需求澄清参数配置\n  - 填写参数解释信息库'},
  ]},
  procure:{name:'采购员',dept:'采购部',color:'#957FC8',icon:'🛒',agents:[
    {name:'样品采购需求协同',desc:'步骤1. 采购员发起样品采购处理，选择电子料/结构件模具/全部\n步骤2. 从ERP查询样品请购单\n步骤3. 从PLM查询样品需求单（对应电子料）和模具手板费用单（结构件/模具）\n步骤4. 对单据中的附件按名称解析分配到对应物料\n步骤5. 汇总生成一份样品询采需求清单\n步骤6. 采购员查看清单并转发询价链接给供应商在线报价\n步骤7. 供应商在线填报报价后自动回写汇总\n步骤8. 采购员查看报价结果并追踪后续收货信息',mcp:'mcp-erp-get-purchase-order|mcp-plm-get-sample-requirement',plugins:'document-parser-plugin|excel-export-plugin',tools:'requirement-aggregator|quotation-link-generator|supplier-quote-collector',datasources:'  - ERP样品请购单\n  - PLM样品需求单\n  - PLM模具手板费用单\n  - 非通用物料判定规则\n  - 图纸外发规则'},
    {name:'物料规格标准化',desc:'步骤1. 研发提交智能报价生成时自动触发\n步骤2. 智能体获取报价信息，解析物料信息\n步骤3. 判断需要采购询价的物料\n步骤4. 对需要采购询价的物料校验规格信息是否符合标准化要求\n步骤5. 按物料分类标准校验每个分类的具体属性要求\n步骤6. 符合标准则通过，进入询价流程\n步骤7. 不符合标准则直接提示研发人员补充修改',mcp:'无',plugins:'data-validation-plugin',tools:'spec-validator|material-classifier',datasources:'  - 物料分类标准\n  - 每个分类的具体属性要求清单\n  - 属性值样本库'},
    {name:'量产采购协同',desc:'步骤1. 用户手动触发量产采购处理\n步骤2. 从ERP获取待处理的请购单数据\n步骤3. 提取物料信息及物料对应产品品号信息\n步骤4. 查询每个物料的可用替换料清单、最小包装量和起订量\n步骤5. 查询每个物料与替换料的供应商及最新有效价格\n步骤6. 计算每个物料与替换料的最低采购价格\n步骤7. 整理物料替换信息与供应商选择信息提交用户确认\n步骤8. 用户调整确认后，按规则合并生成采购单',mcp:'mcp-erp-get-purchase-order|mcp-erp-get-material-price|mcp-srm-get-purchase-order',plugins:'calculation-plugin|excel-export-plugin',tools:'replacement-finder|price-comparator|purchase-order-generator',datasources:'  - ERP请购单\n  - ERP替换件清单\n  - ERP价格表\n  - ERP物料主数据'},
  ]},
  pm:{name:'项目经理',dept:'销售部/研发部',color:'#43A993',icon:'📈',agents:[
    {name:'项目进度可视化',desc:'步骤1. 用户手动触发查看项目进度\n步骤2. 展示项目进度概览卡片（进行中项目数/异常预警数）\n步骤3. 用户点击"查看详情"进入项目管理插件\n步骤4. 从PLM获取研发、开模、小批项目信息\n步骤5. 解析关键里程碑节点的计划开始/计划完成/实际完成时间\n步骤6. 从ERP获取量产类型销售订单及关联的请购/采购/工单/入库/出库单\n步骤7. 从排产和齐套日历插件获取排产与齐套状态\n步骤8. 甘特图分层展示各阶段进度',mcp:'mcp-plm-get-project|mcp-plm-get-milestone|mcp-erp-get-sales-order',plugins:'data-visualization-plugin',tools:'gantt-chart-generator|project-data-aggregator|milestone-parser',datasources:'  - PLM研发/开模/小批项目单\n  - ERP销售/请购/采购/工单/入库单\n  - 排产和齐套日历数据'},
    {name:'采购进度追踪',desc:'步骤1. 用户手动触发查看采购进度\n步骤2. 查询ERP中的订单、工单、采购单、到货单、采购入库单\n步骤3. 从工单解析物料的生产需求信息\n步骤4. 从采购单解析物料的实际采购信息\n步骤5. 从到货单和入库单解析实际到货、质检、入库信息\n步骤6. 汇总所有信息生成采购进度看板\n步骤7. 第一层展示尚未完成生产的工单列表及采购概览（物料入库进度%）\n步骤8. 第二层展示单个工单的采购进度详情（逐物料展示）',mcp:'mcp-erp-get-sales-order|mcp-erp-get-purchase-order|mcp-erp-get-arrival-note|mcp-erp-get-inventory',plugins:'data-visualization-plugin',tools:'progress-calculator|procurement-board-generator',datasources:'  - ERP销售/请购/采购/工单/到货/入库单\n  - ERP客户主数据'},
    {name:'项目异常预警',desc:'步骤1. 在项目管理插件中自动处理\n步骤2. 智能体自动设置每个里程碑节点的预警提醒（触发条件/通知对象/内容/形式）\n步骤3. 允许用户手动修改预警设置\n步骤4. 按照设置的触发条件自动监控节点是否异常\n步骤5. 异常判定：里程碑节点临近未完成/实际完成超期/关键路径延迟\n步骤6. 按设置的通知对象、内容、形式发出通知\n步骤7. 责任人收到通知后处理异常并更新状态\n步骤8. 预警闭环跟踪，超时未处理升级通知给上级主管',mcp:'mcp-plm-get-project|mcp-plm-get-milestone|mcp-erp-get-sales-order',plugins:'notification-plugin|scheduler-plugin',tools:'milestone-monitor|alert-engine|escalation-manager',datasources:'  - PLM研发/开模/小批项目单\n  - ERP销售/请购/采购/工单/入库单'},
  ]},
  exec:{name:'总裁办秘书',dept:'总经办',color:'#E89C3C',icon:'👔',agents:[
    {name:'经营数据综合看板',desc:'步骤1. 用户手动触发，提问经营数据相关问题\n步骤2. 智能体解析用户提问信息，识别数据需求和维度\n步骤3. 匹配智能决策看板：命中看板则调取展示插件\n步骤4. 或匹配指标集：命中指标则调取对应指标数据\n步骤5. 无法匹配时提示用户并引导重新提问\n步骤6. 展示数据卡片（支持侧边栏或新浏览器页签查看详情）\n步骤7. 点击后展开页面查看详细数据和分析',mcp:'mcp-metrics-query|mcp-dashboard-render',plugins:'data-visualization-plugin',tools:'question-parser|dashboard-matcher|data-fetcher',datasources:'  - 指标集数据库\n  - 智能决策看板配置\n  - 常用提问信息库'},
    {name:'个性化数据推送',desc:'步骤1. 用户设置数据推送信息：推送对象、推送数据（决策看板/指标集）、推送时间、推送渠道\n步骤2. 智能体按推送设置创建定时推送任务\n步骤3. 到设定时间自动触发推送任务\n步骤4. 查询最新指标数据\n步骤5. 通过飞书消息或站内通知在规定渠道推送信息\n步骤6. 用户查看推送的经数据看板或指标卡\n步骤7. 支持推送记录查询和推送规则调整',mcp:'mcp-feishu-send-message|mcp-metrics-query',plugins:'notification-plugin|scheduler-plugin',tools:'push-config-manager|scheduled-task-creator|data-pusher',datasources:'  - 推送配置信息库\n  - 指标集数据\n  - 决策看板数据'},
  ]},
};

// ===== 30个核心经营指标集 =====
const DONGULU_INDICATORS = {
  domains: [
    { name: '销售/订单', color: '#4472C4', icon: '📈', count: 4 },
    { name: '生产', color: '#3D9F90', icon: '🏭', count: 6 },
    { name: '设备', color: '#5BA0D0', icon: '🔧', count: 3 },
    { name: '财务', color: '#E89C3C', icon: '💰', count: 4 },
    { name: '供应链', color: '#957FC8', icon: '🚚', count: 3 },
    { name: '质量', color: '#43A993', icon: '✅', count: 2 },
    { name: '人资', color: '#FF6B6B', icon: '👥', count: 5 },
    { name: '项目', color: '#FFA94D', icon: '📋', count: 2 },
    { name: '客户', color: '#748FFC', icon: '🤝', count: 1 },
  ],
  indicators: [
    {id:1,name:'销售额',domain:'销售',unit:'元',period:'日',dim:'时间/客户/厂区/产品/产品类型',desc:'每日销售出库总金额，按不含税销售价计算，是老板每日必看的最核心经营指标。',formula:'出库数量 × 单价(不含税)',system:'鼎捷E10',source:'销货出库单、销售订单、客户应收单'},
    {id:2,name:'客户销售排名',domain:'销售',unit:'-',period:'日',dim:'客户维度降序',desc:'按日出库金额排序的前列客户名单，用于识别关键客户和销售波动。',formula:'按客户维度过滤销售额，按降序排列',system:'鼎捷E10',source:'销售表（基于销售额按客户分组排序）'},
    {id:3,name:'产值',domain:'生产',unit:'元',period:'日',dim:'时间/厂区/产品/产品类型',desc:'每日生产入库总金额，按不含税销售价计算，与销售额对比可反映产销平衡情况。',formula:'入库数量 × 销售单价(不含税)',system:'鼎捷E10',source:'生产入库单、销售订单'},
    {id:4,name:'产量',domain:'生产',unit:'件',period:'日',dim:'时间/厂区/产品/产品类型',desc:'生产入库的产品数量，是计算人均产值、设备效率的基础数据。',formula:'产品入库数量统计',system:'鼎捷E10+精工MES',source:'生产入库单、产品分类'},
    {id:5,name:'费用和资金状况',domain:'财务',unit:'元',period:'日',dim:'时间/厂区/产品/产品类型',desc:'当日费用支出总额（费控报销+非费控支出），以及截至当日的资金余额状况。',formula:'销售产品采购SUM + 费控系统SUM',system:'鼎捷E10',source:'维护付款单、财务模块相关表'},
    {id:6,name:'产能效率(OEE)',domain:'设备',unit:'%',period:'日',dim:'天/线体/工厂',desc:'设备综合效率，包含时间开动率、性能开动率和合格品率，衡量设备利用水平。【按线体为单位】',formula:'时间稼动率×性能稼动率×良品率',system:'华制IOT+精工MES+鼎捷E10',source:'IOT设备开动时间 + MES工况 + ERP生产节拍'},
    {id:7,name:'预算差异率',domain:'财务',unit:'%',period:'月',dim:'部门',desc:'实际费用支出与预算额度的偏离百分比，反映预算管控水平。',formula:'(实际费用-预算额度)÷预算额度×100%',system:'鼎捷E10',source:'实际费用表、会计凭证'},
    {id:8,name:'利润数据(毛利率)',domain:'财务',unit:'%',period:'月',dim:'销售订单/客户/产品/销售人员/厂区',desc:'按日/周/月统计的经营毛利及毛利率，是最终衡量经营成果的核心指标。',formula:'(收入-成本)÷收入×100%',system:'鼎捷E10',source:'收入表、成本表、费用'},
    {id:9,name:'生产达成率',domain:'生产',unit:'%',period:'日',dim:'时间/车间/产线/产品',desc:'实际产量与排产计划量的比率，反映计划执行的严肃性。',formula:'实际产量÷计划产量×100%',system:'精工MES+鼎捷E10',source:'MES排产模块-计划量 + ERP生产入库单-实际产量'},
    {id:10,name:'设备稼动率',domain:'设备',unit:'%',period:'日',dim:'设备/产线',desc:'设备实际运行时间与计划可用时间的比率，反映设备利用效率。',formula:'设备实际运行时间÷计划可用时间×100%',system:'华制智能IOT',source:'IOT设备状态采集（运行/停机、运行时间）'},
    {id:11,name:'制造费用率',domain:'财务',unit:'%',period:'月',dim:'部门',desc:'制造费用占生产成本或产值的比例，反映制造环节的费用控制水平。',formula:'制造费用÷产值×100%',system:'鼎捷E10',source:'ERP成本模块-制造费用科目'},
    {id:12,name:'设备异常停机时长',domain:'设备',unit:'分钟',period:'日',dim:'设备/产线',desc:'设备故障导致的生产线停线总时长，反映设备保障能力。',formula:'Σ(故障恢复时间-故障开始时间)',system:'精工MES+协同办公',source:'MES异常记录表+飞书设备异常登记表'},
    {id:13,name:'项目进度达成率',domain:'项目',unit:'%',period:'月',dim:'部门/项目',desc:'研发项目按里程碑节点完成的比例，反映研发整体推进节奏。',formula:'已完成里程碑数÷总里程碑数×100%',system:'精工PLM',source:'PLM项目表、里程碑表'},
    {id:14,name:'项目合格率',domain:'项目',unit:'%',period:'月',dim:'部门/项目',desc:'研发项目首次试产即通过验收的占比，反映研发质量。',formula:'首次试产通过数÷试产总数×100%',system:'精工PLM+精工MES+鼎捷E10',source:'PLM项目表 + MES工单表+ERP试产工单表'},
    {id:15,name:'新业务拓展数据',domain:'销售',unit:'笔/元',period:'日',dim:'时间/工厂',desc:'新客户开发数量、新客户首单金额等，反映市场拓展进展。',formula:'新客户数=当日新增有效客户数；首单金额=新客户首单出库金额SUM',system:'鼎捷E10',source:'销售订单/客户表'},
    {id:16,name:'订单量',domain:'销售',unit:'笔',period:'日',dim:'时间/工厂',desc:'每日/每周新接订单数量，是销售额的先行指标。',formula:'当日/每周有效新增订单数量SUM',system:'鼎捷E10',source:'销售订单'},
    {id:17,name:'客户满意度得分',domain:'客户',unit:'分',period:'季',dim:'部门',desc:'通过定期向客户各职能部门发送问卷汇总的综合满意度分数。',formula:'Σ(问卷得分)÷有效问卷数',system:'协同办公',source:'飞书客户问卷打分表'},
    {id:18,name:'到货及时率',domain:'供应链',unit:'%',period:'日',dim:'部门/供应商',desc:'采购物料按承诺交期到货的比例，反映供应链保障能力。',formula:'按时到货批次÷总到货批次×100%',system:'携客云SRM',source:'SRM采购订单表+采购入库/到货明细表'},
    {id:19,name:'降本率',domain:'供应链',unit:'%',period:'月',dim:'部门/供应商',desc:'全公司采购成本综合下降比例，反映供应链成本控制成效。',formula:'(基期成本-本期成本)÷基期成本×100%',system:'鼎捷E10',source:'采购表、供应商价格历史表'},
    {id:20,name:'计划达成率',domain:'生产',unit:'%',period:'日',dim:'时间/车间/产线/产品',desc:'生产计划与实际执行的符合度，含数量和交期两个维度。',formula:'(符合数量+交期订单数)÷总计划订单数×100%',system:'精工MES+鼎捷E10',source:'MES工单计划表+工单执行表+ERP生产入库单'},
    {id:21,name:'库存周转率',domain:'供应链',unit:'次',period:'月',dim:'部门/产品',desc:'全公司整体库存周转效率，反映运营资金占用水平。',formula:'销货成本÷[(期初库存+期末库存)÷2]',system:'鼎捷E10+鼎捷WMS',source:'ERP存货台账表+销售出库表'},
    {id:22,name:'物料齐套率',domain:'生产',unit:'%',period:'日',dim:'部门/工单',desc:'工单开工前物料齐套比例，反映计划与物控协同效果。',formula:'齐套工单数÷总开工工单数×100%',system:'精工MES+鼎捷WMS+鼎捷E10',source:'MES工单表+WMS库存表'},
    {id:23,name:'招聘达成率',domain:'人资',unit:'%',period:'月',dim:'部门',desc:'招聘计划完成比例，反映人力补充进度。',formula:'实际到岗人数÷计划招聘人数×100%',system:'协同办公',source:'飞书招聘计划表+入职记录表'},
    {id:24,name:'人力效率',domain:'人资',unit:'元/人',period:'月',dim:'部门',desc:'全公司或分部门的人均产出效率，反映人效水平。',formula:'产值÷工时总数',system:'鼎捷E10+薪福通+协同办公',source:'ERP生产入库表+薪福通考勤表'},
    {id:25,name:'人员流失率',domain:'人资',unit:'%',period:'季',dim:'部门/岗位',desc:'关键岗位或全员流失比例，反映组织稳定性。',formula:'离职人数÷[(期初人数+期末人数)÷2]×100%',system:'薪福通+协同办公',source:'薪福通员工表+飞书离职记录表'},
    {id:26,name:'人均产值',domain:'人资',unit:'元/人',period:'日',dim:'部门/产线',desc:'人均产出，产值/出勤人数',formula:'当日产值÷普工出勤人数×100%',system:'薪福通+鼎捷E10',source:'薪福通出勤人数+ERP产值'},
    {id:27,name:'人力成本产出比',domain:'人资',unit:'%',period:'月',dim:'部门',desc:'薪酬/总产值',formula:'当月总薪酬÷当月总产值×100%',system:'薪福通+鼎捷E10',source:'薪福通薪酬+ERP产值'},
    {id:28,name:'来料合格率',domain:'质量',unit:'%',period:'日',dim:'订单/时间/供应商',desc:'IQC检验合格批次占总检验批次的比例，反映供应商质量水平。',formula:'IQC合格批次÷总检验批次×100%',system:'携客云SRM',source:'SRM检验单表+检验明细表'},
    {id:29,name:'生产直通率',domain:'生产',unit:'%',period:'日',dim:'部门/产线',desc:'产线一次性通过所有测试的产品比例，反映制程质量控制水平。',formula:'一次性通过产品数÷总投入产品数×100%',system:'协同办公+精工MES',source:'飞书手工报表+MES工单/工序检验表'},
    {id:30,name:'重大异常数量',domain:'质量',unit:'件',period:'日',dim:'部门/类型',desc:'影响交付或造成重大损失的质量、设备异常发生次数。',formula:'Σ当日填报次数+系统识别次数',system:'协同办公+精工MES',source:'飞书手工报表+MES异常记录表'},
  ]
};

function renderDongluIndicators() {
  const c = $('content');
  const di = DONGULU_INDICATORS;
  const domainColors = {};
  di.domains.forEach(d => { domainColors[d.name] = d.color; });
  
  // Group indicators by domain
  const grouped = {};
  di.indicators.forEach(ind => {
    if (!grouped[ind.domain]) grouped[ind.domain] = [];
    grouped[ind.domain].push(ind);
  });

  c.innerHTML = `
    <div class="section-header fade-in"><h1>📊 30个核心经营指标集</h1><p>基于蓝图第七章 · 覆盖9大业务域 · 构建经营决策数据底座</p></div>
    <div class="card fade-in" style="background:var(--primary-light);margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center">
        <span style="font-size:14px;font-weight:600;color:var(--primary)">🏷️ 9大业务域 · 30个指标</span>
        <span style="font-size:12px;color:#666">数据来源：鼎捷E10 · 精工MES · 华制IOT · 携客云SRM · 薪福通 · 飞书</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;justify-content:center">
        ${di.domains.map(d => `<span style="padding:4px 12px;border-radius:12px;background:${d.color}15;color:${d.color};font-size:12px;font-weight:500">${d.icon} ${d.name} (${d.count})</span>`).join('')}
      </div>
    </div>
    <!-- Compact summary table -->
    <div class="card fade-in" style="padding:0;overflow:hidden">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:linear-gradient(135deg,#2E7D6F,#3D9F90);color:#fff">
            <th style="padding:10px 8px;text-align:center;width:40px">#</th>
            <th style="padding:10px 8px;text-align:left">指标名称</th>
            <th style="padding:10px 8px;text-align:center;width:70px">业务域</th>
            <th style="padding:10px 8px;text-align:center;width:50px">单位</th>
            <th style="padding:10px 8px;text-align:center;width:40px">周期</th>
            <th style="padding:10px 8px;text-align:left">指标描述</th>
            <th style="padding:10px 8px;text-align:left">公式/口径</th>
            <th style="padding:10px 8px;text-align:left">归属系统</th>
          </tr>
        </thead>
        <tbody>
          ${di.indicators.map((ind, i) => {
            const dc = domainColors[ind.domain] || '#666';
            return `<tr style="border-bottom:1px solid #eee;${i%2===0?'background:#fff':'background:#F9FAFB'}">
              <td style="padding:8px;text-align:center;font-weight:600;color:${dc}">${ind.id}</td>
              <td style="padding:8px;text-align:left;font-weight:500">${ind.name}</td>
              <td style="padding:8px;text-align:center"><span style="padding:2px 8px;border-radius:8px;background:${dc}15;color:${dc};font-size:10px;font-weight:500">${ind.domain}</span></td>
              <td style="padding:8px;text-align:center;color:#666">${ind.unit}</td>
              <td style="padding:8px;text-align:center;color:#666">${ind.period}</td>
              <td style="padding:8px;text-align:left;color:#555;font-size:11px;line-height:1.4">${ind.desc}</td>
              <td style="padding:8px;text-align:left;color:#555;font-size:10px;line-height:1.4">${ind.formula}</td>
              <td style="padding:8px;text-align:left;color:#555;font-size:10px">${ind.system}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    <!-- Domain drilldown cards -->
    <div style="margin-top:16px">
      <div class="section-header fade-in" style="padding:0;margin-bottom:10px"><h2 style="font-size:16px">📂 按业务域分组详情</h2></div>
      ${di.domains.map(d => {
        const inds = grouped[d.name] || [];
        return `
        <div class="card fade-in" style="border-left:4px solid ${d.color};margin-bottom:12px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <span style="font-size:22px">${d.icon}</span>
            <div><span style="font-size:15px;font-weight:600;color:${d.color}">${d.name}域</span><span style="font-size:11px;color:#999;margin-left:8px">${inds.length}个指标</span></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${inds.map(ind => `
              <div style="padding:10px;border-radius:6px;background:#fff;border:1px solid ${d.color}15">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                  <span style="width:22px;height:22px;border-radius:50%;background:${d.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">${ind.id}</span>
                  <span style="font-size:13px;font-weight:600;color:#222">${ind.name}</span>
                  <span style="font-size:10px;color:#999;margin-left:auto">${ind.unit} · ${ind.period}</span>
                </div>
                <div style="font-size:11px;color:#555;line-height:1.4">${ind.desc}</div>
                <div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap">
                  <span style="font-size:9px;padding:2px 6px;border-radius:4px;background:#E8EFF9;color:#4472C4">📐 ${ind.formula}</span>
                  <span style="font-size:9px;padding:2px 6px;border-radius:4px;background:#E8F5F3;color:#3D9F90">🔗 ${ind.system}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="card fade-in" style="background:var(--primary-light);text-align:center">
      <div style="font-size:13px;font-weight:600;color:var(--primary);margin-bottom:4px">📋 总计：30个核心经营指标</div>
      <div style="font-size:11px;color:#666">覆盖9大业务域 · 数据基于鼎捷E10/精工MES/华制IOT/携客云SRM/薪福通/飞书多系统融合</div>
    </div>
  `;
}

function renderDongluEmployees() {
  const c = $('content');
  c.innerHTML = `
    <div class="section-header fade-in"><h1>👥 13个数字员工 · 26个业务智能体</h1><p>基于蓝图第六章 · 覆盖10个业务部门 · 全价值链AI赋能</p></div>
    ${Object.entries(DONGULU_AGENTS).map(([key, emp]) => `
      <div class="card fade-in" style="border-left:4px solid ${emp.color};margin-bottom:10px;cursor:pointer" onclick="navigateTo('donglu-agent-${key}')">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <span style="font-size:24px">${emp.icon}</span>
          <div><div style="font-size:15px;font-weight:600;color:${emp.color}">${emp.name}</div><div style="font-size:11px;color:var(--text2)">${emp.dept} · ${emp.agents.length}个智能体</div></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px">${emp.agents.map(a => `<span class="tag" style="background:${emp.color}15;color:${emp.color}">${a.name}</span>`).join('')}</div>
      </div>
    `).join('')}
    <div class="card fade-in" style="background:var(--primary-light);text-align:center">
      <div style="font-size:13px;font-weight:600;color:var(--primary)">📊 智能体类型分布</div>
      <div style="display:flex;justify-content:center;gap:16px;margin-top:8px;flex-wrap:wrap">
        <span style="font-size:12px">🤖 自动化型 12个</span>
        <span style="font-size:12px">🧠 决策型 6个</span>
        <span style="font-size:12px">📊 分析型 5个</span>
        <span style="font-size:12px">📚 知识型 3个</span>
      </div>
    </div>
  `;
}

function renderDongluAgent(key) {
  const emp = DONGULU_AGENTS[key];
  if (!emp) return;
  const c = $('content');
  
  // Build chat conversation bubbles per agent
  const agentChats = emp.agents.map((a, i) => {
    // Split by newlines to get individual steps
    const stepLines = a.desc.split('\n');
    const workflowSteps = stepLines.map((line, si) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      // Check if line starts with "步骤"
      const isStep = trimmed.match(/步骤\d+/);
      return `
          <div style="display:flex;gap:10px;margin:6px 0;${isStep ? '' : 'padding-left:24px;'}">
            ${isStep ? `<span style="background:${emp.color};color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:1px">${trimmed.match(/步骤(\d+)/)[1]}</span>`
            : `<span style="color:${emp.color};font-size:12px;flex-shrink:0">↳</span>`}
            <span style="font-size:13px;line-height:1.6;color:${isStep ? 'var(--text)' : 'var(--text2)'}">${isStep ? trimmed.replace(/^步骤\d+[.．\s]*/, '') : trimmed}</span>
          </div>`;
    }).join('');
    
    return `
    <div id="agent-${i}" style="margin-bottom:20px;padding-top:8px">
      <!-- Question: user asks -->
      <div style="display:flex;justify-content:flex-end;margin-bottom:10px">
        <div style="max-width:75%;background:#3D9F90;color:#fff;padding:10px 16px;border-radius:16px 16px 4px 16px;font-size:13px;line-height:1.5">
          🧑 请介绍一下「${a.name}」的详细工作流程？
        </div>
      </div>
      <!-- Answer: agent responds -->
      <div style="display:flex;gap:12px;margin-bottom:6px">
        <div style="width:36px;height:36px;border-radius:10px;background:${emp.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:0 2px 6px ${emp.color}40">${emp.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:${emp.color};margin-bottom:6px;display:flex;align-items:center;gap:8px">
            ${emp.name} · ${a.name}
            <span style="font-size:10px;color:#999;font-weight:400">刚刚</span>
          </div>
          <div style="background:#fff;border-radius:12px 12px 12px 4px;padding:14px 18px;border-left:3px solid ${emp.color};box-shadow:0 1px 4px rgba(0,0,0,0.06)">
            <div style="font-size:12px;font-weight:600;color:${emp.color};margin-bottom:8px;display:flex;align-items:center;gap:6px">
              <span>📋 工作流程（共${stepLines.filter(l=>l.trim().match(/步骤\d+/)).length}步）</span>
            </div>
            ${workflowSteps}
            <!-- Tech stack section -->
            <div style="margin-top:12px;padding-top:10px;border-top:2px solid ${emp.color}15">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px">
                <div style="background:#E8EFF9;padding:8px 10px;border-radius:6px">
                  <div style="font-weight:600;color:#4472C4;margin-bottom:3px">🔌 MCP工具</div>
                  <div style="color:#555;line-height:1.5;word-break:break-all">${a.mcp || '无'}</div>
                </div>
                <div style="background:#E8F5F3;padding:8px 10px;border-radius:6px">
                  <div style="font-weight:600;color:#3D9F90;margin-bottom:3px">🧩 Plugins</div>
                  <div style="color:#555;line-height:1.5;word-break:break-all">${a.plugins || '无'}</div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">
                <div style="background:#FDF4E8;padding:8px 10px;border-radius:6px">
                  <div style="font-weight:600;color:#E89C3C;margin-bottom:3px">🛠️ Tools</div>
                  <div style="color:#555;line-height:1.5;word-break:break-all">${a.tools || '无'}</div>
                </div>
                <div style="background:#F3EFF9;padding:8px 10px;border-radius:6px">
                  <div style="font-weight:600;color:#957FC8;margin-bottom:3px">📊 数据源</div>
                  <div style="color:#555;line-height:1.5;font-size:10px">${a.datasources ? a.datasources.split('\\n').map(d=>d.trim()).filter(d=>d).map(d=>'• '+d).join('<br>') : '无'}</div>
                </div>
              </div>
            </div>
            <div style="margin-top:8px;padding-top:8px;border-top:1px dashed #E8E8E8;display:flex;gap:8px;flex-wrap:wrap">
              <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:${emp.color}12;color:${emp.color}">🏢 ${emp.dept}</span>
              <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:#E8F5F3;color:#3D9F90">⚡ ${['手动触发','定时触发','事件触发'][i % 3]}</span>
              <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:#E8EFF9;color:#4472C4">🔗 ${['ERP系统','PLM系统','MES系统','SRM系统','银行API','飞书集成'][i % 6]}</span>
              <span style="font-size:10px;padding:2px 8px;border-radius:10px;background:#FDF4E8;color:#E89C3C">🤖 ${['自动化型','决策型','分析型','知识型'][i % 4]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  c.innerHTML = `
    <div class="section-header fade-in">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:48px;height:48px;border-radius:12px;background:${emp.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${emp.icon}</div>
        <div>
          <h1 style="color:${emp.color};margin:0;font-size:22px">${emp.name}</h1>
          <p style="margin:2px 0 0 0;font-size:13px;color:var(--text2)">${emp.dept} · ${emp.agents.length}个智能体 · AI智能体对话窗口</p>
        </div>
      </div>
    </div>
    <!-- Chat header bar -->
    <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;background:#fff;border-radius:12px 12px 0 0;border-bottom:2px solid ${emp.color};margin-bottom:0">
      <div style="width:10px;height:10px;border-radius:50%;background:#4CAF50"></div>
      <span style="font-size:13px;font-weight:500">${emp.name} 在线</span>
      <span style="font-size:11px;color:#999;margin-left:auto">${emp.agents.length}个智能体可咨询</span>
    </div>
    <!-- Agent quick nav chips -->
    <div style="display:flex;gap:6px;flex-wrap:wrap;padding:10px 16px;background:#fff;border-bottom:1px solid #E8E8E8">
      <span style="font-size:11px;color:#999;margin-right:4px">快速跳转：</span>
      ${emp.agents.map((a, i) => `
        <span style="padding:3px 10px;border-radius:12px;background:${emp.color}10;color:${emp.color};font-size:11px;font-weight:500;cursor:pointer;border:1px solid ${emp.color}20" onclick="document.getElementById('agent-${i}').scrollIntoView({behavior:'smooth',block:'start'})">
          #${i+1} ${a.name}
        </span>
      `).join('')}
    </div>
    <!-- Chat messages area -->
    <div style="padding:16px 20px;background:#F5F7FA;border-radius:0 0 12px 12px;margin-bottom:12px">
      ${agentChats}
    </div>
    <!-- Summary bar -->
    <div style="display:flex;gap:12px;flex-wrap:wrap;padding:12px 20px;background:#fff;border-radius:12px;border:1px solid ${emp.color}20;margin-bottom:12px">
      <div><span style="font-size:11px;color:#999">🤖 智能体</span><br><span style="font-size:13px;font-weight:600">${emp.agents.length}个</span></div>
      <div><span style="font-size:11px;color:#999">🏢 部门</span><br><span style="font-size:13px;font-weight:600">${emp.dept}</span></div>
      <div><span style="font-size:11px;color:#999">⚡ 触发</span><br><span style="font-size:13px;font-weight:600">手动/定时/事件</span></div>
      <div><span style="font-size:11px;color:#999">🔗 系统</span><br><span style="font-size:13px;font-weight:600">ERP/PLM/MES/SRM</span></div>
    </div>
    <div style="text-align:center;margin:12px 0">
      <a class="quick-link" onclick="navigateTo('donglu-employees')">← 返回全部13个数字员工</a>
    </div>
  `;
}

// ===== 甘肃稀土 =====
function renderProjectGansu() {
  const c = $('content'); const p = RESUME_DATA.projects[2];
  c.innerHTML = `
    <div class="section-header fade-in"><h1>⛏️ 甘肃稀土制造运营管理平台（MOM）</h1><p>需求分析 · 蓝图设计 · 容器云PaaS · 生产执行八大模块</p></div>
    <div class="project-card fade-in" style="border-left-color:${p.color}">
      <div class="header"><h2 style="color:${p.color}">${p.name}</h2><div class="meta">${p.period} · ${p.role}</div></div>
      <div style="margin-bottom:12px;font-size:13px;line-height:1.6">${p.desc}</div>
      <div class="quick-links-row">${p.tags.map(t => `<span class="tag tag-orange">${t}</span>`).join('')}</div>
    </div>
    <div class="card fade-in">
      <div class="card-title">🏗️ 平台架构（四层能力）</div>
      <div class="achievement-grid">
        <div class="achievement-item" style="border-left-color:#E89C3C"><div class="num" style="color:#E89C3C">01</div><div class="title">基础平台</div><div class="desc">容器云平台（IaaS+分布式容器+云原生PaaS），支持工业一体机/虚拟机部署，实现服务器利旧降低成本</div></div>
        <div class="achievement-item" style="border-left-color:#3D9F90"><div class="num" style="color:#3D9F90">02</div><div class="title">工业数据智能平台</div><div class="desc">数据质量治理（质量规则/智能清洗/预警统计），数据共享（API/数据同步/本地接口），支撑第三方业务系统</div></div>
        <div class="achievement-item" style="border-left-color:#4472C4"><div class="num" style="color:#4472C4">03</div><div class="title">工业业务模型平台</div><div class="desc">生产管控主数据统一管理（物料/装置/进出厂/仪表/能源/组织/设备模型），真实3D建模（装置/罐/管道/仪表）</div></div>
        <div class="achievement-item" style="border-left-color:#957FC8"><div class="num" style="color:#957FC8">04</div><div class="title">技术管理平台</div><div class="desc">低代码开发平台实现平台与应用无缝衔接，支持快速扩展和定制化开发</div></div>
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">📋 招投标工作</div>
      <div style="display:flex;gap:12px;align-items:flex-start">
        <div style="font-size:36px;flex-shrink:0">📄</div>
        <div>
          <div style="font-size:13px;line-height:1.7">${p.detail.bidding}</div>
          <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
            <span class="tag tag-orange">招标解读</span>
            <span class="tag tag-orange">技术方案编写</span>
            <span class="tag tag-orange">评分应答</span>
            <span class="tag tag-orange">述标答疑</span>
            <span class="tag tag-orange">项目落地</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">🏭 生产执行管理八大模块</div>
      <div style="font-size:13px;line-height:1.7;margin-bottom:10px">${p.detail.mom}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px">
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#E89C3C">工单管理</div>
          <div style="font-size:10px;color:var(--text2)">生产工单创建/下发/跟踪/关闭</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#3D9F90">工艺管理</div>
          <div style="font-size:10px;color:var(--text2)">工艺路线/参数/版本管控</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#4472C4">计划管理</div>
          <div style="font-size:10px;color:var(--text2)">生产计划编制/下达/跟踪</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#957FC8">调度管理</div>
          <div style="font-size:10px;color:var(--text2)">生产调度/排产/指令下发</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#5BA0D0">操作管理</div>
          <div style="font-size:10px;color:var(--text2)">操作指令/巡检/日志</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#43A993">物料管理</div>
          <div style="font-size:10px;color:var(--text2)">物料跟踪/消耗/库存</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#E89C3C">能源管理</div>
          <div style="font-size:10px;color:var(--text2)">水/电/汽/风能耗监控分析</div>
        </div>
        <div style="padding:10px;border-radius:6px;background:var(--bg);text-align:center">
          <div style="font-size:11px;font-weight:600;color:#4472C4">质量管理</div>
          <div style="font-size:10px;color:var(--text2)">质检/追溯/合格率分析</div>
        </div>
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">📊 平台UI & 展示层</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
        <div style="padding:16px;border-radius:8px;background:var(--bg);text-align:center">
          <div style="font-size:28px;margin-bottom:6px">🏠</div>
          <div style="font-size:13px;font-weight:600;color:#E89C3C">领导驾驶舱</div>
          <div style="font-size:11px;color:var(--text2);margin-top:4px">经营决策/营销分析/生产运营综合管控</div>
        </div>
        <div style="padding:16px;border-radius:8px;background:var(--bg);text-align:center">
          <div style="font-size:28px;margin-bottom:6px">🏭</div>
          <div style="font-size:13px;font-weight:600;color:#3D9F90">三维虚拟工厂</div>
          <div style="font-size:11px;color:var(--text2);margin-top:4px">3D建模装置/罐/管道/仪表，多维度场景展示</div>
        </div>
        <div style="padding:16px;border-radius:8px;background:var(--bg);text-align:center">
          <div style="font-size:28px;margin-bottom:6px">📱</div>
          <div style="font-size:13px;font-weight:600;color:#4472C4">移动APP</div>
          <div style="font-size:11px;color:var(--text2);margin-top:4px">移动端审批/查询/监控/操作</div>
        </div>
      </div>
    </div>
    <div class="card fade-in">
      <div class="card-title">🎯 项目价值</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <div style="flex:1;min-width:150px;padding:12px;border-radius:8px;background:var(--primary-light);text-align:center">
          <div style="font-size:20px;font-weight:700;color:var(--primary)">📈</div>
          <div style="font-size:12px;color:var(--text);margin-top:4px">生产运营透明化管控</div>
        </div>
        <div style="flex:1;min-width:150px;padding:12px;border-radius:8px;background:#E8EFF9;text-align:center">
          <div style="font-size:20px;font-weight:700;color:#4472C4">🔄</div>
          <div style="font-size:12px;color:var(--text);margin-top:4px">打通NCC/OA等异构系统</div>
        </div>
        <div style="flex:1;min-width:150px;padding:12px;border-radius:8px;background:#FDF4E8;text-align:center">
          <div style="font-size:20px;font-weight:700;color:#E89C3C">🏗️</div>
          <div style="font-size:12px;color:var(--text);margin-top:4px">容器云+低代码可扩展平台</div>
        </div>
      </div>
    </div>
  `;
}

// ===== 城市试点×成熟度 =====
function renderProjectCity() {
  const c = $('content'); const p = RESUME_DATA.projects[1];
  c.innerHTML = `
    <div class="section-header fade-in"><h1>🏙️ 城市试点 × 智能制造成熟度评估</h1><p>政企融合项目 · 300+家企业评估数据沉淀</p></div>
    <div class="project-card fade-in" style="border-left-color:${p.color}">
      <div class="header"><h2 style="color:${p.color}">${p.name}</h2><div class="meta">${p.period} · ${p.role}</div></div>
      <div style="margin-bottom:12px"><span class="highlight">${p.highlight}</span></div>
      <div class="quick-links-row">${p.tags.map(t => `<span class="tag tag-blue">${t}</span>`).join('')}</div>
    </div>

    <div class="grid-2 fade-in" style="margin-top:0">
      ${p.sections.map(s => `
        <div class="card" style="border-top:3px solid ${s.color}">
          <div class="card-title" style="font-size:15px;color:${s.color}">${s.title}</div>
          ${s.items.map(item => `<div style="padding:3px 0;font-size:12px;display:flex;gap:6px"><span style="color:${s.color}">▸</span>${item}</div>`).join('')}
        </div>
      `).join('')}
    </div>

    <div class="card fade-in">
      <div class="card-title" style="color:#4472C4">🏢 服务企业名录（部分）</div>
      <div style="margin-bottom:8px;font-size:12px;color:var(--text2)">深圳市城市试点项目 · 累计服务诊断企业超300家，以下为部分代表企业：</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:4px;font-size:11px">
        ${['遨游通讯','邦正','博朗耐','达德航空','鼎泰电子','顾美','海泰精工','华晨口腔','华成工业','华秋电子','鲸视','君燊','科敏传感','蓝之洋','IC封装','抛物线','普森斯','祺鑫环保','清星浮','三品模具','莎朗','世纪互通','泰达机器人','维嘉意','西迪特','肖端电子','兴业邦','友华','云天','卓兴半导体','奥凯睿','超频3','东陆','金大智能','康普盾','朗驰欣创','麦科信','佩城','锐巽','芯科睿','鑫承诺','长兴达','真朴科技'].map(name => `
          <div style="padding:6px 8px;border-radius:4px;background:#E8EFF9;color:#4472C4;text-align:center;font-size:10px;font-weight:500">${name}</div>
        `).join('')}
      </div>
      <div style="margin-top:8px;font-size:11px;color:var(--text2);text-align:center;padding:6px;background:var(--bg);border-radius:6px">📊 覆盖行业：3C电子 · 机械设备 · 金属加工 · 食品医药 · 模具制造 · 光电通信 · 自动化设备</div>
    </div>

    <div class="card fade-in">
      <div class="card-title" style="color:${p.color}">🔄 两项目融合价值</div>
      <div class="fusion-grid">
        ${p.fusion.map(f => `
          <div class="fusion-item"><div class="fi-icon">${f.icon}</div><div class="fi-title" style="color:${p.color}">${f.title}</div><div class="fi-desc">${f.desc}</div></div>
        `).join('')}
      </div>
      <div style="margin-top:12px;padding:12px;background:var(--primary-light);border-radius:8px;font-size:12px;color:var(--primary);font-weight:500">
        💡 关键成果：通过大规模企业评估，深度理解中小制造企业4大共性痛点——系统数据不通、部门协同低效、底层数据失真、核心业务依赖人工经验。这些认知直接赋能后续东陆AI智能平台方案设计。
      </div>
    </div>
  `;
}

// ===== 其他项目 =====
function renderProjects() {
  const c = $('content'); const others = RESUME_DATA.projects.slice(2);
  c.innerHTML = `
    <div class="section-header fade-in"><h1>📁 其他项目经历</h1><p>甘肃稀土 · 太重数智人 · 宁德时代AI</p></div>
    ${others.map(p => `
      <div class="project-card fade-in" style="border-left-color:${p.color}">
        <div class="header"><h2 style="color:${p.color}">${p.name}</h2><div class="meta">${p.period} · ${p.role}</div></div>
        <div style="margin-bottom:8px;font-size:13px;line-height:1.6">${p.desc}</div>
        <div class="quick-links-row">${p.tags.map(t => `<span class="tag tag-green">${t}</span>`).join('')}</div>
      </div>
    `).join('')}
    <div class="card fade-in">
      <div class="card-title">🎓 教育经历</div>
      <div style="font-size:14px">${RESUME_DATA.education}</div>
      <div style="font-size:12px;color:var(--text2);margin-top:4px">工作经验：17年（2010 - 2026）</div>
    </div>
  `;
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('welcome');
});
