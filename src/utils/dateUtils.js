/**
 * 格式化台北時間
 * @param {string|Date} dateString
 * @param {string} format 
 * @returns {string} 
 */
export function formatTaipeiTime(dateString, format = 'full') {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // 檢查是否為有效日期
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return '';
  }

  const options = {
    timeZone: 'Asia/Taipei',
  };

  switch (format) {
    case 'full':
      // 2025/10/31 23:45
      return date.toLocaleString('zh-TW', {
        ...options,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    
    case 'datetime':
      // 2025年10月31日 23:45:30
      return date.toLocaleString('zh-TW', {
        ...options,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    
    case 'date':
      // 2025/10/31
      return date.toLocaleDateString('zh-TW', {
        ...options,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    
    case 'date-long':
      // 2025年10月31日
      return date.toLocaleDateString('zh-TW', {
        ...options,
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    
    case 'time':
      // 23:45
      return date.toLocaleTimeString('zh-TW', {
        ...options,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    
    case 'time-with-seconds':
      // 23:45:30
      return date.toLocaleTimeString('zh-TW', {
        ...options,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    
    case 'short':
      // 10/31 23:45
      return date.toLocaleString('zh-TW', {
        ...options,
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    
    case 'weekday':
      // 2025/10/31 (週五) 23:45
      const weekday = date.toLocaleDateString('zh-TW', {
        ...options,
        weekday: 'short'
      });
      const datetime = date.toLocaleString('zh-TW', {
        ...options,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      return `${datetime} (${weekday})`;
    
    default:
      return date.toLocaleString('zh-TW', {
        ...options,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
  }
}

/**
 * 取得相對時間（例如：3 分鐘前、2 小時前）
 * @param {string|Date} dateString - ISO 8601 格式的日期字串或 Date 物件
 * @returns {string} 相對時間描述
 */
export function getRelativeTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  
  // 檢查是否為有效日期
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return '';
  }
  
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // 未來的時間
  if (diffMs < 0) {
    const absDiffMins = Math.abs(diffMins);
    const absDiffHours = Math.abs(diffHours);
    const absDiffDays = Math.abs(diffDays);
    
    if (absDiffMins < 60) return `${absDiffMins} 分鐘後`;
    if (absDiffHours < 24) return `${absDiffHours} 小時後`;
    return `${absDiffDays} 天後`;
  }

  // 過去的時間
  if (diffSecs < 10) return '剛剛';
  if (diffSecs < 60) return `${diffSecs} 秒前`;
  if (diffMins < 60) return `${diffMins} 分鐘前`;
  if (diffHours < 24) return `${diffHours} 小時前`;
  if (diffDays < 7) return `${diffDays} 天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 週前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} 個月前`;
  
  return formatTaipeiTime(dateString, 'date');
}

/**
 * 判斷是否為今天
 * @param {string|Date} dateString - 日期字串或 Date 物件
 * @returns {boolean} 是否為今天
 */
export function isToday(dateString) {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  
  return date.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }) === 
         today.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' });
}

/**
 * 判斷是否為昨天
 * @param {string|Date} dateString - 日期字串或 Date 物件
 * @returns {boolean} 是否為昨天
 */
export function isYesterday(dateString) {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return date.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }) === 
         yesterday.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' });
}

/**
 * 智能顯示時間（今天顯示時間，其他顯示日期）
 * @param {string|Date} dateString - 日期字串或 Date 物件
 * @returns {string} 格式化的時間
 */
export function smartTimeDisplay(dateString) {
  if (!dateString) return '';
  
  if (isToday(dateString)) {
    return `今天 ${formatTaipeiTime(dateString, 'time')}`;
  } else if (isYesterday(dateString)) {
    return `昨天 ${formatTaipeiTime(dateString, 'time')}`;
  } else {
    return formatTaipeiTime(dateString, 'full');
  }
}

/**
 * 格式化訂單編號的時間戳（從訂單編號取出時間）
 * @param {string} orderNumber - 訂單編號（例如：1761882058245）
 * @returns {string} 格式化的時間
 */
export function formatOrderTime(orderNumber) {
  if (!orderNumber) return '';
  
  // 訂單編號格式：時間戳（13位數字）
  const timestamp = parseInt(orderNumber);
  
  if (isNaN(timestamp) || timestamp.toString().length !== 13) {
    return '';
  }
  
  return formatTaipeiTime(new Date(timestamp), 'full');
}