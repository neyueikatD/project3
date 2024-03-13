class TableTemplate {
    static fillIn(tableId, data, columnName) {
      const table = document.getElementById(tableId);
      const headerRow = table.rows[0];
      for (const cell of headerRow.cells) {
        this.fillInCell(cell, data);
      }
      if (columnName) {
        const columnIndex = Array.from(headerRow.cells).findIndex(cell => cell.textContent.trim() === columnName);
        if (columnIndex !== -1) {
          for (let i = 1; i < table.rows.length; i++) {
            const cell = table.rows[i].cells[columnIndex];
            this.fillInCell(cell, data);
          }
        }
      } else {
        for (let i = 1; i < table.rows.length; i++) {
          for (const cell of table.rows[i].cells) {
            this.fillInCell(cell, data);
          }
        }
      }
      if (table.style.visibility === 'hidden') {
        table.style.visibility = 'visible';
      }
    }
    static fillInCell(cell, data) {
      const templateStrings = cell.textContent.match(/{{\w+}}/g);
      if (templateStrings) {
        for (const templateString of templateStrings) {
          const propertyName = templateString.slice(2, -2);
          const propertyValue = data[propertyName];
          if (propertyValue !== undefined) {
            cell.textContent = cell.textContent.replace(templateString, propertyValue);
          } else {
            cell.textContent = '';
          }
        }
      }
    }
  }