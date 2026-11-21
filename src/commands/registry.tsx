import { profile, skills } from '../data/profile';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import type { CommandResult } from '../types/terminal';

const line = (content: string, kind: 'text' | 'success' | 'muted' | 'heading' = 'text') => ({ kind, content });

export function runCommand(raw: string): { output: CommandResult; action?: 'clear' | 'resume' | 'projects' | 'contact' } {
  const [command = '', ...args] = raw.trim().split(/\s+/);
  const cmd = command.toLowerCase();
  const arg = args.join(' ').toLowerCase();

  switch (cmd) {
    case '': return { output: [] };
    case 'help':
      return { output: [line('AVAILABLE COMMANDS', 'heading'), line('help             list available commands', 'success'), line('whoami           identify the engineer'), line('about            engineering profile'), line('experience       career timeline'), line('projects         featured work'), line('open <project>   inspect a project'), line('skills           technical toolkit'), line('neofetch         system profile'), line('contact          contact details'), line('resume           download PDF resume'), line('clear            clear terminal history'), line(''), line('TIP: Use ↑ / ↓ to navigate command history.') ] };
    case 'whoami':
      return { output: [line(profile.name, 'success'), line(profile.title), line(profile.location, 'muted')] };
    case 'about':
      return { output: [line('ENGINEERING PROFILE', 'heading'), line(profile.summary), line('Approach: understand the problem → design the system → measure the result.', 'muted')] };
    case 'experience':
      return { output: experience.flatMap((job, index) => [line(`${String(index + 1).padStart(2, '0')}  ${job.company} / ${job.role}`, 'heading'), line(`${job.client} · ${job.period}`, 'success'), ...job.points.map(point => line(`  • ${point}`)), line('')]) };
    case 'projects':
      return { output: [line('PROJECT INDEX', 'heading'), ...projects.map(project => line(`${project.id.padEnd(17)} ${project.name}  [${project.type}]`, 'success')), line(''), line('Run: open ge-engine | open hdfc-platform | open cme-etl | open stoqo', 'muted')], action: 'projects' };
    case 'open': {
      const project = projects.find(item => item.id === arg || item.name.toLowerCase().includes(arg));
      if (!project) return { output: [line(`No project found: ${arg || '(missing)'}`, 'muted'), line('Try: projects')] };
      return { output: [line(project.name.toUpperCase(), 'heading'), line(`${project.type} · ${project.status}`, 'success'), line(project.description), line('STACK', 'heading'), line(project.stack.join('  /  '), 'success'), line('DETAILS', 'heading'), ...project.details.map(detail => line(`• ${detail}`)), ...(project.note ? [line(String(project.note), 'muted')] : [])] };
    }
    case 'skills':
      return { output: skills.flatMap(group => [line(group.group, 'heading'), line(group.values.join('  ·  '), 'success')]) };
    case 'neofetch':
      return { output: [line('       _   _   _', 'success'), line('  _ __| | | | | |__', 'success'), line(' |  __| | | | |  _ \\', 'success'), line(' | |  | |_| | | |_) |', 'success'), line(' |_|   \\__,_| |_.__/', 'success'), line(''), line(`${profile.name} @ naresh-os`), line('---------------------------', 'muted'), line(`Role:       ${profile.title}`), line(`Experience: ${profile.experience}`), line('Focus:      Backend systems'), line('Runtime:    Browser / static'), line('Shell:      naresh-sh 1.0'), line('Status:     Open to opportunities', 'success')] };
    case 'contact':
      return { output: [line('ESTABLISH CONNECTION', 'heading'), line(`Email:   ${profile.email}`, 'success'), line(`GitHub:  ${profile.github}`, 'success'), line(`Phone:   ${profile.phone}`, 'muted'), line('LinkedIn URL can be added when provided.', 'muted')], action: 'contact' };
    case 'resume':
      return { output: [line('Preparing resume.pdf ...', 'success'), line('If the download did not start, use the Resume link in the header.', 'muted')], action: 'resume' };
    case 'clear':
      return { output: [], action: 'clear' };
    case 'sudo':
      return { output: [line('Nice try. This portfolio runs in a sandboxed browser — no root access here.', 'success')] };
    case 'exit':
      return { output: [line('There is no exit. Try `help` or keep exploring.', 'muted')] };
    default:
      return { output: [line(`command not found: ${cmd}`, 'muted'), line("Type 'help' to see available commands.")] };
  }
}
