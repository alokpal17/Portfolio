import {
  Code2, Brain, LayoutDashboard, Server, Database, Container, Wrench,
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight,
  ArrowUpRight, Menu, X, Send, Download, Sparkles, Cpu, Cloud,
  GitBranch, Layers, Terminal, GraduationCap, Copy, Check, Zap,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Code2, Brain, LayoutDashboard, Server, Database, Container, Wrench,
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight,
  ArrowUpRight, Menu, X, Send, Download, Sparkles, Cpu, Cloud,
  GitBranch, Layers, Terminal, GraduationCap, Copy, Check, Zap,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
