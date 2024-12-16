import s from './styles.module.scss'

interface StatsCardProps {
  title: string;
  value: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <article className={s.stats_card}>
      <h2>{title}</h2>
      <span>{value}</span>
    </article>
  )
}