import re

def update_worklog_total(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    total_hours = 0.0
    table_started = False
    total_row_index = -1

    for i, line in enumerate(lines):
        if '|' in line and re.search(r'\|:\s*-+', line):
            table_started = True
            continue

        if table_started:
            if '**Total**' in line or 'Total' in line:
                total_row_index = i
                break

            columns = [col.strip() for col in line.split('|')]
            if len(columns) >= 4:
                try:
                    total_hours += float(columns[2])
                except ValueError:
                    continue

    if total_row_index != -1:
        display_total = int(total_hours) if total_hours.is_integer() else total_hours
        lines[total_row_index] = f"|**Total**|**{display_total}**||\n"

        with open(file_path, 'w', encoding='utf-8') as file:
            file.writelines(lines)
        print(f"Successfully updated total hours to: {display_total}")
    else:
        print("Total row not found in the file.")

if __name__ == "__main__":
    update_worklog_total("documentation/worklog.md")