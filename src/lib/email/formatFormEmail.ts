
import { type IntroFormData } from '@/lib/schemas/introFormSchema';
import { type MainFormData } from '@/lib/schemas/mainFormSchema';

export function formatFormEmail(type: 'introduction' | 'main', data: IntroFormData | MainFormData): string {
  const title = type === 'introduction' ? 'Introduction Course Registration' : 'Full Programme Application';

  // Basic HTML table generator for data
  const generateTable = (obj: any) => {
    let rows = '';
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Nested object (recurse or skip)
        continue;
      }

      let displayValue = value;

      if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
          // Generate sub-table for array of objects
          const headers = Object.keys(value[0]);

          const headerRow = `<tr>${headers.map(h =>
            `<th style="text-align:left; padding: 6px; border-bottom: 1px solid #ddd; color: #555; background-color: #f9f9f9; font-size: 11px; text-transform: capitalize;">
               ${h.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
             </th>`
          ).join('')}</tr>`;

          const subRows = value.map((item: any) =>
            `<tr>${headers.map(h =>
              `<td style="padding: 6px; border-bottom: 1px solid #eee; font-size: 12px; color: #333;">
                 ${item[h] !== null && item[h] !== undefined ? item[h] : '-'}
               </td>`
            ).join('')}</tr>`
          ).join('');

          displayValue = `
             <table style="width: 100%; border-collapse: collapse; margin-top: 5px; border: 1px solid #eee; border-radius: 4px; overflow: hidden;">
               <thead>${headerRow}</thead>
               <tbody>${subRows}</tbody>
             </table>
           `;
        } else {
          displayValue = value.join(', ');
        }
      }

      rows += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%; color: #333;">
            ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">
            ${displayValue || '-'}
          </td>
        </tr>
      `;
    }
    return `
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        ${rows}
      </table>
    `;
  };

  const content = generateTable(data);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background-color: #8B1A2D; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
        .footer { font-size: 12px; color: #888; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2 style="margin:0;">${title}</h2>
      </div>
      <div class="content">
        <p>A new registration has been received from the website.</p>
        
        <h3>Applicant Details</h3>
        ${content}
        
        <p style="margin-top: 20px; font-size: 14px; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">
          Received via ASTI Website Form
        </p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Advanced Solutions Technical Institute
      </div>
    </body>
    </html>
  `;
}
