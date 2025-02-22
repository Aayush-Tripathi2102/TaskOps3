export interface Task {
  id: number;
  name: string;
  description: string;
  points: number;
  secret: string;
  status: string;
}

export interface Team {
  name: string;
  password: string;
  round_id: number;
  total_score: number;
  is_sabotaged: boolean;
  sabotaged_task_id: number;
  is_final: boolean;
  sabotage_tasks: Task[];
  can_sabotage: boolean;
  normal_tasks: Task[];
  final_tasks: Task[];
  recently_solved_timestamp: string;
}

export interface Round {
  id: string;
  round_name: string;
  is_active: boolean;
  is_final: boolean;
}
