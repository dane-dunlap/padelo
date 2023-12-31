'use client'
import { useEffect, useState } from 'react';
import TournamentCard from '../components/TournamentCard';  // Ensure path is correct
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link'
import LogoutButton from '../components/LogOut';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Gauge,Trophy,MapPin } from 'lucide-react';




const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [levelFilter, setLevelFilter] = useState("");


  async function get_tournaments(level) {
    try {
        let query = supabase.from('tournaments').select(`*,profiles:club_id (club_name)`);
        if (level) query = query.eq('tournament_level', level);
        const { data, error } = await query;
        if (error) throw error;
        setTournaments(data);
    } catch (error) {
        console.error('Error fetching tournaments:', error);
    }
}

useEffect(() => {
    get_tournaments(levelFilter);
}, [levelFilter]);

  return (
    
    
    <div>
      
     <div>
    <label htmlFor="levelFilter">Level: </label>
    <select 
        name="levelFilter" 
        value={levelFilter}
        onChange={(e) => setLevelFilter(e.target.value)}
    >
        <option value="">All</option>
        <option value="C">C</option>
        <option value="C+">C+</option>
        <option value="Open C">Open C</option>
        {/* Additional options as needed */}
    </select>
    </div>
    <div className="flex flex-wrap justify-start">
  {tournaments.map((tournament, index) => (
    <Link href={`/tournaments/${tournament.id}`} key={index}>
      <Card className="m-3 rounded-2xl w-[320px]">
        <CardHeader>
          <img
            src={tournament.tournament_image}
            alt="Card Image"
            className="rounded-2xl w-full h-[200px] object-cover"
          />
          <CardTitle>{tournament.tournament_name}</CardTitle>
          <CardDescription>Wednesday May 4th 2023</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="flex items-center space-x-2">
            <Gauge/> 
            <span>{tournament.tournament_level}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Trophy/> 
            <span>{tournament.tournament_prize}</span>
          </p>
          <p className="flex items-center space-x-2">
            <MapPin/> 
            <span>Just Padel</span>
          </p>
        </CardContent>

       
      </Card>
    </Link>
  ))}
</div>
</div>)}
