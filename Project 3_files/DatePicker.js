'use strict';
class DatePicker {
  constructor(divId, onDateSelect) {
    this.divId = divId;
    this.onDateSelect = onDateSelect;
    this.currentDate = new Date();
    this.render();
    const prevButton = document.getElementById(`${this.divId}-prev`);
    const nextButton = document.getElementById(`${this.divId}-next`);
    prevButton.addEventListener('click', () => this.prevMonth());
    nextButton.addEventListener('click', () => this.nextMonth());
  }
  render() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const html = `
      <div class="datepicker-header">
        <button id="${this.divId}-prev"> &lt; </button>
        <span>${monthNames[month]} ${year}</span>
        <button id="${this.divId}-next"> &gt; </button>
      </div>
      <table>
        <thead>
          <tr>
            ${dayNames.map(day => `<th>${day}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${this.renderDays(firstDayOfMonth, lastDayOfMonth)}
        </tbody>
      </table>
    `;

    document.getElementById(this.divId).innerHTML = html;
  }
  renderDays(firstDayOfMonth, lastDayOfMonth) {
    const days = [];
    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
      const date = new Date(day);
      const isCurrentMonth = date.getMonth() === this.currentDate.getMonth();
      const className = isCurrentMonth ? 'current-month' : 'other-month';
      if (date.getDay() === 0 || date.getDay() === 6) {
        days.push(`<tr class="${className}">`);
      }
      days.push(`  <td class="${className}" data-date="${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}">${date.getDate()}</td>`);
      if (date.getDay() === 6) {
        days.push('</tr>');
      }
    }
    return days.join('');
  }
  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.render();
  }
  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.render();
  }
  selectDate(date) {
    const [year, month, day] = date.split('-').map(Number);
    this.onDateSelect(this.divId, { year, month, day });
  }
}