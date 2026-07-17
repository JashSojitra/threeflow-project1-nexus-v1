import { useState } from 'react';
import { ArrowRight, Briefcase, Building2, FilePlus2, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { type ScenarioId } from './data';
import { useLocale } from './locale';
import { useNexus } from './store';

const choices: { id: ScenarioId; icon: typeof Building2; title: string; description: string }[] = [
  { id: 'transfer', icon: Building2, title: 'scenario.transfer', description: 'scenario.transferDesc' },
  { id: 'newhire', icon: Briefcase, title: 'scenario.newhire', description: 'scenario.newhireDesc' },
  { id: 'blank', icon: FilePlus2, title: 'scenario.blank', description: 'scenario.blankDesc' },
];

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const { locale, setLocale, t } = useLocale();
  const { loadScenario } = useNexus();
  const [selected, setSelected] = useState<ScenarioId>('transfer');
  const selectedChoice = choices.find(choice => choice.id === selected)!;
  const continueToWorkflow = () => { loadScenario(selected); onContinue(); };

  return <main className="nexus-welcome">
    <header className="nexus-welcome__header">
      <div className="flex items-center gap-3"><span className="nexus-welcome__mark"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span><div><p className="text-sm font-semibold tracking-tight">Project Nexus</p><p className="text-xs text-[var(--text-muted)]">{t('header.readiness')}</p></div></div>
      <div className="flex items-center gap-3"><span className="nexus-welcome__security"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />{t('header.security')}</span><div className="nexus-welcome__language" role="group" aria-label={t('header.language')}>{(['en', 'fr'] as const).map(language => <button key={language} type="button" onClick={() => setLocale(language)} aria-pressed={locale === language} className={locale === language ? 'is-selected' : ''}>{language.toUpperCase()}</button>)}</div></div>
    </header>
    <section className="nexus-welcome__hero" aria-labelledby="welcome-title">
      <div className="nexus-welcome__eyebrow"><Sparkles className="h-4 w-4" aria-hidden="true" />{t('header.prototype')}</div>
      <h1 id="welcome-title">{t('welcome.title')}</h1><p>{t('welcome.description')}</p>
      <div className="nexus-welcome__chooser" role="radiogroup" aria-label={t('welcome.choose')}>
        {choices.map(choice => { const Icon = choice.icon; const isSelected = selected === choice.id; return <button key={choice.id} type="button" role="radio" aria-checked={isSelected} onClick={() => setSelected(choice.id)} className={`nexus-welcome__choice ${isSelected ? 'is-selected' : ''}`}><span className="nexus-welcome__choice-icon"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="min-w-0 text-left"><span className="block text-sm font-semibold">{t(choice.title)}</span><span className="mt-1 block text-xs leading-5 text-[var(--text-secondary)]">{t(choice.description)}</span></span>{isSelected && <span className="nexus-welcome__check" aria-label={t('scenario.selected')}>✓</span>}</button>; })}
      </div>
      <button type="button" onClick={continueToWorkflow} className="nexus-welcome__continue"><span>{t('welcome.continue')} <span className="font-normal">· {t(selectedChoice.title)}</span></span><ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
      <p className="nexus-welcome__note">{t('welcome.note')}</p>
    </section>
  </main>;
}
