import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from '../components/ui/card';
  
  function StatCard({ title, value, icon, additionalInfo }) {
    return (
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          {icon}
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-4xl">{value}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">{additionalInfo}</div>
        </CardContent>
      </Card>
    );
  }
  
  export default StatCard;